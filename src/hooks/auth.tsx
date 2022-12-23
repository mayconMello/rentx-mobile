import { createContext, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import { authUrl, uriProfile } from "../utils/configs.google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getUserDataStorage,
  getUserIdStorage,
  setUserDataStorage,
  setUserIdStorage,
  removeUserOnlyStorage
} from "../utils/storageTables";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface IAuthContextData {
  user: UserData;
  userStorageLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  setUserStorageLoading: (isLoading: boolean) => void;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);


function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData>({} as UserData);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function signIn() {
    try {
      const { params, type } = await AuthSession.startAsync(
        { authUrl }
      ) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          uriProfile(params.access_token)
        );
        const userLogged = await response.json();
        const userData = {
          id: userLogged.id,
          email: userLogged.email,
          name: userLogged.given_name,
        }

        setUser(userData);

        await setUserIdStorage(
          userData.id
        );
        await setUserDataStorage(
          userData.id,
          userData
        )
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as UserData);

    await removeUserOnlyStorage(user.id)
  }

  useEffect(() => {
    (async () => {
      const loading = userStorageLoading;
      const userId = await getUserIdStorage()

      console.log(userId);

      const userStoraged = await getUserDataStorage(
        userId
      )

      if (userStoraged) {
        setUser(userStoraged)
      }
      setUserStorageLoading(!loading)
    })();
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      userStorageLoading,
      setUserStorageLoading,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context
}

export { AuthProvider, useAuth }
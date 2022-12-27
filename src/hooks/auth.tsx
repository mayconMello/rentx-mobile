import * as AuthSession from 'expo-auth-session';
import { createContext, useContext, useState } from "react";
import { api } from '../service/api';
import { authUrl, uriProfile } from "../utils/configs.google";
import {
  removeUserOnlyStorage, setUserDataStorage,
  setUserIdStorage
} from "../utils/storageTables";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: UserData;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}


interface IAuthContextData {
  user: UserData;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);


function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [user, setUser] = useState<UserData>({} as UserData);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password
    });

    const { token, user } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user })
  }

  async function signInWithGoogle() {
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
          driver_license: 'abc123',
          avatar: 'abc'
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

  return (
    <AuthContext.Provider value={{
      user: data.user,
      signIn,
      signInWithGoogle,
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

export { AuthProvider, useAuth };

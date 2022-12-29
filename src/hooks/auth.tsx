import { createContext, useContext, useEffect, useState } from "react";
import { api } from '../service/api';

import { database } from '../database';
import { User } from '../database/model/User';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserData {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
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
  updateUser: (user: UserData) => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);


function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<UserData>({} as UserData);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      const { token, user } = response.data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.collections.get<User>('users');

      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id
          newUser.name = user.name
          newUser.email = user.email
          newUser.driver_license = user.driver_license
          newUser.avatar = user.avatar
          newUser.token = token
        })
      })
      setData({ ...user, token })
    } catch (error) {
      console.error(error)
      throw new Error(error as string);
    }
  }

  async function signInWithGoogle() {
    // try {
    //   const { params, type } = await AuthSession.startAsync(
    //     { authUrl }
    //   ) as AuthorizationResponse;

    //   if (type === 'success') {
    //     const response = await fetch(
    //       uriProfile(params.access_token)
    //     );
    //     const userLogged = await response.json();
    //     const userData = {
    //       id: userLogged.id,
    //       email: userLogged.email,
    //       name: userLogged.given_name,
    //       driver_license: 'abc123',
    //       avatar: 'abc'
    //     }

    //     setUser({ ...user, token: '' });

    //     await setUserIdStorage(
    //       userData.id
    //     );
    //     await setUserDataStorage(
    //       userData.id,
    //       userData
    //     )
    //   }

    // } catch (error) {
    //   throw new Error(error as string);
    // }
  }

  async function signOut() {
    try {
      const userCollection = database.get<User>('users');

      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently()
        setData({} as User);
        api.defaults.headers.authorization = null;
      })
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async function updateUser(user: UserData) {
    try {
      const userCollection = database.get<User>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData) => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        })
        setData(user);
      })
    } catch (error) {
      throw new Error(error as string);
    }
  }

  useEffect(() => {
    (async function loadUserData() {
      const userCollection = database.get<User>('users');
      const response = await userCollection.query().fetch();
      if (response.length > 0) {
        const userData = response[6]._raw as unknown as User
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
      }
    })();
  }, [])

  return (
    <AuthContext.Provider value={{
      user: data,
      signIn,
      signInWithGoogle,
      signOut,
      updateUser
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

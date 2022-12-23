import AsyncStorage from "@react-native-async-storage/async-storage";

const initials = 'rentx:'

interface UserData {
  id: string;
  name: string;
  email: string;
}

export async function setUserIdStorage(userId: string) {
  await AsyncStorage.setItem(
    `${initials}:userOnline`,
    JSON.stringify({
      userId,
    })
  )
}

export async function getUserIdStorage(): Promise<string | null> {
  const userIdStorage = await AsyncStorage.getItem(
    `${initials}:userOnline`
  )

  if (userIdStorage) {
    return JSON.parse(
      userIdStorage
    ).userId

  }
  return null;
}

export async function setUserDataStorage(
  userId: string,
  user: UserData
) {
  await AsyncStorage.setItem(
    `${initials}:user_${userId}`,
    JSON.stringify(user)
  )
}

export async function getUserDataStorage(
  userId: string
): Promise<UserData | null> {

  const userDataStorage = await AsyncStorage.getItem(
    `${initials}:user_${userId}`
  )

  if (userDataStorage) {
    return JSON.parse(
      userDataStorage
    )
  }
  return null;
}

export async function removeUserOnlyStorage(userId: string) {
  await AsyncStorage.removeItem(
    `${initials}:userOnline`
  )

  await AsyncStorage.removeItem(
    `${initials}:user_${userId}`
  )
}
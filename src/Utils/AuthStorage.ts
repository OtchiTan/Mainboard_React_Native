import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getToken(): Promise<string | null | Error> {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch (error) {
    return error as Error;
  }
}

export async function setToken(newToken: string): Promise<void | Error> {
  try {
    await AsyncStorage.setItem('auth_token', newToken);
  } catch (error) {
    return error as Error;
  }
}

export async function clearToken(): Promise<void | Error> {
  try {
    await AsyncStorage.removeItem('auth_token');
  } catch (error) {
    return error as Error;
  }
}

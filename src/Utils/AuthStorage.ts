import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getToken() {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch (error) {
    return error;
  }
}

export async function setToken(newToken: string) {
  try {
    await AsyncStorage.setItem('auth_token', newToken);
  } catch (error) {
    return error;
  }
}

export async function getAuthHeader() {
  const token = await getToken();
  if (typeof token === 'string') return {Authorization: `Bearer ${token}`};
}

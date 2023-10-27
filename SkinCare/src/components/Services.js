import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export function onNotificationOpenedApp(callback) {
  return messaging().onNotificationOpenedApp(callback);
}

export function onMessage(callback) {
  return messaging().onMessage(callback);
}

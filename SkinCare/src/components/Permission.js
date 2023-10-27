import {Alert, PermissionsAndroid, Platform} from 'react-native';


export const Cameraper = async () => {
  if (Platform.OS == 'android') {
    const cameraPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,)

        if(cameraPermission === PermissionsAndroid.RESULTS.GRANTED){
            // console.log('camera permission success',cameraPermission)
            return(true)
            }else{
                // console.log('camera permission failed--->',cameraPermission)
                return(false)
            }
  
};
 
}
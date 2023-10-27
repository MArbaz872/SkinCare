import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  Keyboard,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PushNotification } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Colors, Icons } from '../theme';
import { AppStatusBar, TextView, CustomButton, Loader } from '../components';
import firebase from '../config/FirebaseConfig';
import { SendNotification1, SendNotification5 } from '../components/PushNotification';


const Login = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState({
    username: '',
    password: '',
    deviceId: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [fetchUserdata, setUserData] = React.useState(null);
  const [isProgress, setProgress] = React.useState(false);


  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = async (userName, password) => {
    Keyboard.dismiss();
    setProgress(true)
    if (data.username.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username field cannot be empty.',
        [{ text: 'Okay' }],
        setProgress(false)
      );
      return;
    }
    else {

      await firebase.auth().signInWithEmailAndPassword(data.username, data.password).then(async (res) => {
        // console.log("res=======>",res.user.uid)
     
        await AsyncStorage.setItem("doc_id", res.user.uid);
        // const token = (await PushNotification.getDevicePushTokenAsync()).data;
        // console.log("Token=======>",token)
        // await firebase
        //   .firestore()
        //   .collection("users")
        //   .doc(res.user.uid)
        //   .update({ expoToken: token });
        firebase
          .firestore()
          .collection("users")
          .doc(res.user.uid)
          .get()
          .then((documentSnapshot) => {
            setProgress(false)
            console.log("Designation======> now",documentSnapshot.data().isBlock)
            // return
            if(documentSnapshot.data().isBlock == 0){
            if (res.user.emailVerified == false) {
              navigation.replace("Email Verification");
            } else {
              if (documentSnapshot.data().designation == "Doctor") {
                navigation.replace("DoctorNavigation");
              } else if (documentSnapshot.data().designation == "Patient") {
                navigation.replace("MyDrawer");
                //console.log(documentSnapshot.data().designation);
              } else {
                navigation.replace("AdminNavigation");
                //console.log(documentSnapshot.data().designation);
                //navigation.replace('DrawerNavigationScreen');
              }
              console.log("emailVerified =====", res.user.emailVerified);
              console.log("User logged-in successfully!");
            }}
            else{
              SendNotification5()
            }
          });
      }).catch((error) => {
        Alert.alert(error.message);
      });
    }
    // try{
    //   await firebase.auth().signInWithEmailAndPassword(data.username,data.password)

    // }catch(error){
    //   alert(error.message)
    // }



  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.primary }]}>
      <AppStatusBar></AppStatusBar>
      <View style={styles.header}>
        {isProgress ? (
          <Loader />
        ) : (
          <Image
            style={{
              height: 170,
              width: 170,
              resizeMode: 'contain',
              alignSelf: 'center',
              justifyContent: 'center',
              // marginBottom: 5
              borderRadius:30
            }}
            source={Icons.Logonew}
          />
        )}

      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: Colors.backgroundColor,
          },
        ]}>
        <TextView
          text="Email"
          type={'normalRg'}
          style={{ color: Colors.text }}
        />
        <View style={styles.action}>
          <FontAwesome name="user-o" color={Colors.text} size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#cdcdcd"
            style={[
              styles.textInput,
              {
                color: Colors.darkGreenColor,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <TextView
          text="Password"
          type={'normalRg'}
          style={{ color: Colors.text, marginTop: 20 }}
        />

        <View style={styles.action}>
          <Feather name="lock" color={Colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#cdcdcd"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: Colors.darkGreenColor,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 6 characters long.
            </Text>
          </Animatable.View>
        )}

        {/* <TouchableOpacity onPress={() => navigation.navigate ('Signup')}>
          <Text style={{color: '#009387', marginTop:15}}>SignUp</Text>
        </TouchableOpacity> */}

        <View style={styles.button}>
          <CustomButton
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}
            text={'Sign In'}></CustomButton>

        </View>
        <View style={styles.button}>

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={[
              styles.signIn,
              { borderColor: "#009387", borderWidth: 1, },
            ]}
          >
            <Text style={[styles.textSign, { color: "#009387" }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 0,
    marginTop: 100,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Login;
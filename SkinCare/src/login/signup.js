import React,{useState} from 'react';
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
  SafeAreaView,
  ScrollView
} from 'react-native';
import { RadioButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Colors, Icons } from '../theme';
import { AppStatusBar, TextView, CustomButton, Loader } from '../components';
import firebase from 'firebase/compat';
import validator from 'validator';

const Signup = () =>{
    const navigation = useNavigation();
    const [full_Name, setfull_Name] = useState("");
    const [email, setemail] = useState("");
    const [Age, setAge] = useState("");
    const [City, setCity] = useState("");
    const [Gender, setGender] = useState("");
    const [Phone, setPhone] = useState("");
    const [l_Name, setl_Name] = useState("");
    const [error, setError] = useState("");
    const [value, setValue] = useState("Patient");
    const [data, setData] = React.useState({
      email: "",
      password: "",
      // pmdc: "",
      displayName: full_Name,
      check_textInputChange: false,
      secureTextEntry: true,
      check_textInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true,
    });
 
    const [fetchUserdata, setUserData] = React.useState(null);
    const [isProgress, setProgress] = React.useState(false);

    const textInputChange = val => {
        if (val.trim().length >= 4) {
            setfull_Name({
            ...data,
            username: val,
            check_textInputChange: true,
            isValidUser: true,
          });
        } else {
            setfull_Name({
            ...data,
            username: val,
            check_textInputChange: false,
            isValidUser: false,
          });
        }
      };
      const emailtextInputChange = val => {
        if (val.trim().length >= 4) {
            setemail({
            val,
            email: val,
            check_textInputChange: true,
            isValidUser: true,
          });
        } else {
            setemail({
            val,
            email: val,
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

      const handleValidEmail = val => {
        if (validator.isEmail(val)) {
            setData({
            ...data,
            email: val,
            isValidEmail: true,
          });
        } else {
            setData({
            ...data,
            email: val,
            isValidEmail: false,
          });
        }
      };
      const SignupHandle = async (userName, password) => {
        Keyboard.dismiss();
        setProgress(true)
        if (data.email === "" && data.password === "") {
          Alert.alert("Enter details to signup!");
        } else {
          try {
            firebase
              .auth()
              .createUserWithEmailAndPassword(data.email, data.password)
              .then((res) => {
                firebase.firestore().collection("users").doc(res.user.uid).set({
                  name: full_Name,
                  email: email,
                  designation: value,
                  user_id: res.user.uid,
    
                  age: Age,
                  city: City,
                  country: "Pakistan",
                  gender: Gender,
                  phone: Phone,
                });
                console.log("User registered successfully!");
                const user = firebase.auth().currentUser;
                if (user) {
                  try {
                     user.sendEmailVerification();
                     setProgress(false)
                    console.log("Email verification sent successfully.");
                    Alert.alert("Registered Successfully!!!");
                  } catch (error) {
                    console.error("Error sending email verification:", error);
                  }
                } else {
                  setProgress(false)
                  console.log("No user is currently signed in.");
                }
              })
              .catch((error) => {
                setProgress(false)
                Alert.alert(error.message);
              });
          } catch (error) {
            setProgress(false)
            console.log(error);
          }
        }
    
    
    
      };

    return(
        <View style={[styles.container, { backgroundColor:Colors.primary }]}>
           <AppStatusBar></AppStatusBar>
           <View style={styles.header}>
           {isProgress && <Loader></Loader>}
        {/* <Image
          style={{
            height: 170,
            width: 170,
            resizeMode: 'contain',
            alignSelf: 'center',
            justifyContent:'center',
            // marginBottom:5
          }}
          source={Icons.skinlogo2}></Image> */}
      </View>
          <ScrollView>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: Colors.backgroundColor,
          },
        ]}>
        <TextView
          text="Full Name"
          type={'normalRg'}
          style={{ color: Colors.text }}
        />
        <View style={styles.action}>
          <FontAwesome name="user-o" color={Colors.text} size={20} />
          <TextInput
            placeholder="Your Full Name"
            placeholderTextColor="#cdcdcd"
            style={[
              styles.textInput,
              {
                color: Colors.darkGreenColor,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => setfull_Name(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {full_Name ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}
        <TextView
          text="Full Email"
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
            onChangeText={val => setemail(val)}
            onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
          />
          {email ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Provider Valid Email.
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
        
        <TextView
          text="Age"
          type={'normalRg'}
          style={{ color: Colors.text }}
        />
        <View style={styles.action}>
          <FontAwesome name="user-o" color={Colors.text} size={20} />
          <TextInput
            placeholder="Age"
            keyboardType='numeric'
            placeholderTextColor="#cdcdcd"
            style={[
              styles.textInput,
              {
                color: Colors.darkGreenColor,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => setAge(val)}
            // onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
        </View>
        <TextView
          text="City"
          type={'normalRg'}
          style={{ color: Colors.text }}
        />
        <View style={styles.action}>
          <FontAwesome name="user-o" color={Colors.text} size={20} />
          <TextInput
            placeholder="City"
            // keyboardType='numeric'
            placeholderTextColor="#cdcdcd"
            style={[
              styles.textInput,
              {
                color: Colors.darkGreenColor,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => setCity(val)}
            // onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
        </View>

        <TextView
          text="Gender"
          type={'normalRg'}
          style={{ color: Colors.text }}
        />
        <View style={styles.action}>
          <FontAwesome name="user-o" color={Colors.text} size={20} />
          <TextInput
            placeholder="Gender"
            // keyboardType='numeric'
            placeholderTextColor="#cdcdcd"
            style={[
              styles.textInput,
              {
                color: Colors.darkGreenColor,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => setGender(val)}
            // onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
        </View>

        <TextView
          text="Phone No"
          type={'normalRg'}
          style={{ color: Colors.text }}
        />
        <View style={styles.action}>
          <FontAwesome name="user-o" color={Colors.text} size={20} />
          <TextInput
            placeholder="Phone No"
            keyboardType='numeric'
            placeholderTextColor="#cdcdcd"
            style={[
              styles.textInput,
              {
                color: Colors.darkGreenColor,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => setPhone(val)}
            // onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
        </View>

        <TouchableOpacity>
          {/* <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text> */}
        </TouchableOpacity>
        
        <View>
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}
          >
            <RadioButton.Item label="Patient" value="Patient" />
            <RadioButton.Item label="Doctor" value="Doctor" />
          </RadioButton.Group>
        </View>

        <View style={styles.button}>
          <CustomButton
            style={styles.signIn}
            onPress={() => {
              SignupHandle(data.username, data.password);
            }}
            text={'Sign Up'}></CustomButton>

          {/* {isProgress && <Loader></Loader>} */}
        </View>
        <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={[
              styles.signIn,
              { borderColor: "#009387", borderWidth: 1, marginTop:15 },
            ]}
          >
            <Text style={[styles.textSign, { color: "#009387" }]}>Sign In</Text>
          </TouchableOpacity>
      </Animatable.View>
      </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      width:'100%',
      height:'25%'
      // justifyContent: 'flex-end',
      // paddingHorizontal: 20,
      // paddingBottom: 0,
      // marginTop: 100,
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
      marginTop: 50,
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
    text_header2: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 30,
    },
  });


export default Signup;
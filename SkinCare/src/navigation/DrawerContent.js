import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { TextView } from "../components";
import { Colors } from "../theme";
import firebase from "firebase/compat";

const DrawerContent = () => {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  // const paperTheme = useTheme();
  const user = firebase.auth().currentUser;
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.dispatch(DrawerActions.closeDrawer()); // Close the drawer
    navigation.navigate(screenName); // Navigate to the desired screen
  };
  if(name == ''){
    firebase.firestore()
      .collection('users')
      .where('user_id','==',user.uid)
      .get()
      .then(querySnapshot => {
          // console.log('Total users:--------> ', querySnapshot);
          // return
          querySnapshot.forEach(documentSnapshot => {
              // console.log('User ID: =========>', documentSnapshot.id, documentSnapshot.data());
              setName(documentSnapshot.data().name);
              setEmail(documentSnapshot.data().email);
          })
      }).catch(error => {
        console.log("errror====>",error)
      })
    }
    const userSignOut = ()=>{
      firebase.auth().signOut();
      console.log("Log Out Successfully");
      navigation.replace('Login');
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#142a4b" }}>
      {/* Drawer header */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={require("../assests/images/user.jpg")}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        />
         <View style={{ marginLeft: 10 }}>
          <TextView type={"normal"} style={{ color: Colors.white }} text={name} />
          <TextView type={"mini_description"} style={{ color: Colors.white }} text={email} />
          <TextView
            type={"normalRg"}
            style={{ color: Colors.white, marginTop: 2 }}
            text="Hi!  What do you want to do today?"
          />
        </View>
      </View>

      {/* Drawer menu items */}<View style={{height:'8%'}}></View>
      <View style={{flex:1,alignItems:'flex-start',justifyContent:'flex-start'}}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToScreen("Home")}
        >
          <MaterialIcons name="home" size={24} color={Colors.white} />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToScreen("PatientProfile")}
        >
          <MaterialIcons name="person" size={24} color={Colors.white} />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToScreen("UpdatePatientProfile")}
        >
          <MaterialIcons name="person" size={24} color={Colors.white} />
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToScreen("StatisticScreen")}
        >
          <MaterialIcons name="person" size={24} color={Colors.white} />
          <Text style={styles.menuText}>Statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToScreen("LearningResourcesStack")}
        >
          <MaterialIcons name="person" size={24} color={Colors.white} />
          <Text style={styles.menuText}>Learning Resource</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToScreen("PatientProfile")}
        >
          <MaterialIcons name="person" size={24} color={Colors.white} />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>


      </View>

      <TouchableOpacity
          style={styles.menuItem}
          onPress={() => userSignOut()}
        >
          <FontAwesome6 name="toggle-off" size={24} color={Colors.white} />
          <Text style={styles.menuText}>Sign Out</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
  menuText: {
    marginLeft: 20,
    color: Colors.white,
    fontSize: 16,
  },
});

export default DrawerContent;

import React,{useEffect,useState} from 'react';
import { View,Text,StyleSheet,SafeAreaView,TouchableOpacity } from 'react-native';
import {Avatar, Caption, Title} from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from 'firebase/compat';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'; 
import { useNavigation } from '@react-navigation/native';

function PatientProfile(){
  const navigation = useNavigation();

  const [name,setName]= useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [country,setCountry] = useState('');
  const [phone,setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender,setGender] = useState('');
  const user = firebase.auth().currentUser;


  useEffect(()=>{
    firebase.firestore()
    .collection('users')
    .where("user_id","==",user.uid)
    .get()
    .then(querySnapshot => {
      //console.log('Total users: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
      //  console.log('User ID:=======> ', documentSnapshot.id, documentSnapshot.data());
        setName(documentSnapshot.data().name);
        setEmail(documentSnapshot.data().email);
        setAge(documentSnapshot.data().age);
        setGender(documentSnapshot.data().gender);
        setCity(documentSnapshot.data().city);
        setCountry(documentSnapshot.data().country);
        setPhone(documentSnapshot.data().phone);
     // console.log(documentSnapshot.name)
    });
  });

  },[])


    return(
        <SafeAreaView style={styles.container}>
           <View style={styles.customHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="menu" size={25} color="gray" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Patient Profile</Text>
      <View style={{ width: 60 }}></View>
    </View>
         
        <View style={styles.userInfoSection}>
          
          <View style={{flexDirection:'row',marginTop:15}}>
            <Avatar.Image
            source={require('../../assests/images/oval.png')}
            size={80}/>
            <View style={{marginLeft:20}}>
              <Title style={[styles.title,{marginTop:15,marginBottom:5}]}>{name}</Title>
              <Caption style={styles.caption}>{email}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="location-pin" color="#777777" size={20}/>
            <Text>{city}, {country}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20}/>
            <Text>{phone}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="man" color="#777777" size={20}/>
            <Text>{age}</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="gender-male-female-variant" color="#777777" size={20}/>
            <Text>{gender}</Text>
          </View>
        </View>
        <View style={styles.button}>
              <TouchableOpacity style={styles.signIn}>
                  <LinearGradient colors={[ '#130C52','#245e46']} style={styles.signIn}>
                      <Text style={[styles.textSign,{color:'#fff'}]}>Deactivate Account</Text>
                  </LinearGradient>
              </TouchableOpacity>
          </View>
      </SafeAreaView>
  );
}


export default PatientProfile;


const styles = StyleSheet.create({
container: {
  flex: 1,
},
userInfoSection: {
  paddingHorizontal: 30,
  marginBottom: 25,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
},
caption: {
  fontSize: 14,
  lineHeight: 14,
  fontWeight: '500',
},
row: {
  flexDirection: 'row',
  marginBottom: 10,
},
infoBoxWrapper: {
  borderBottomColor: '#dddddd',
  borderBottomWidth: 1,
  borderTopColor: '#dddddd',
  borderTopWidth: 1,
  flexDirection: 'row',
  height: 100,
},
infoBox: {
  width: '50%',
  alignItems: 'center',
  justifyContent: 'center',
},
menuWrapper: {
  marginTop: 10,
},
menuItem: {
  flexDirection: 'row',
  paddingVertical: 15,
  paddingHorizontal: 30,
},
menuItemText: {
  color: '#777777',
  marginLeft: 20,
  fontWeight: '600',
  fontSize: 16,
  lineHeight: 26,
},
button: {
  alignItems: 'center',
  marginTop: 50
},
signIn: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
},
textSign: {
  fontSize: 18,
  fontWeight: 'bold'
},
customHeader:{
  flexDirection:'row',
  width:'100%',
  height:'3%',
  alignItems:'center',
  justifyContent:'space-between',

},
backIcon:{

},
headerText: {
  fontSize: 18,
  fontWeight: 'bold',
},
});
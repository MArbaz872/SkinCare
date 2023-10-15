import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import firebase from 'firebase/compat';
import {useTheme} from 'react-native-paper';
import AppStatusBar from "../../components/AppStatusBar";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'; 

// import BottomSheet from 'reanimated-bottom-sheet';
// import Animated from 'react-native-reanimated';


const UpdatePatientProfile = () => {
  const navigation = useNavigation();


  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const {colors} = useTheme();

  const [newName, setNewName] = useState('');
  const [name,setName]= useState('');
  const [id,setid]= useState('');
  const [city,setCity] = useState('');
  const [country,setCountry] = useState('');
  const [phone,setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender,setGender] = useState('');


  useEffect(()=>{
    firebase.firestore()
    .collection('users')
    .where("designation",'==','Doctor')
    .get()
    .then(querySnapshot => {
      //console.log('Total users: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
       console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        setName(documentSnapshot.data().name);
        setid(documentSnapshot.data().user_id);
       // console.log(documentSnapshot.data().name);
    });
  });
   },[])
  
   const updateProfile = ()=>{
    if(newName==''||age==''||city==''||country==''||phone==''||gender==''){
      Alert.alert("Please Fill all fields");
    }else{
      firebase.firestore()
      .collection('users')
      .doc(id)
      .update({
        name:newName,
        age:age,
        country:country,
        city:city,
        gender:gender,
        phone:phone
      })
      .then(() => {
        Alert.alert('User updated!');
      });
    }
   }

  return (
    <View style={styles.container}>
        {/* <AppStatusBar /> */}
        <View style={styles.customHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="menu" size={25} color="gray" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Patient Profile</Text>
      <View style={{ width: 60 }}></View>
    </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>{name}</Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#666666"
            value={newName}
            onChangeText={setNewName}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>

        
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        
        
        <View style={styles.action}>
          <Icon name="gender-male-female" color={colors.text} size={20}/>
          <TextInput
            placeholder="Gender"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={gender}
            onChangeText={setGender}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>

        <View style={styles.action}>
         {/* <Feather name="phone" color={colors.text} size={20} />*/}
         <Icon name="human-child" color={colors.text} size={20}/>
          <TextInput
            placeholder="Age"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={age}
            onChangeText={setAge}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            value={country}
            onChangeText={setCountry}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            value={city}
            onChangeText={setCity}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => updateProfile()}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};

export default UpdatePatientProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor:Colors.primary,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
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

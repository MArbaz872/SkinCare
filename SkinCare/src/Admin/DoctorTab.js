import React,{} from 'react'
import {createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Dimensions,View} from 'react-native';
const {height, width} = Dimensions.get('window');
import { Colors } from '../theme';
import AddUser from './AddUser';
import Doctor from './Doctor';
import DocNotification from './DocNotification';
import Patient from './Patient';

// import { connect, useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const DoctorTab=()=> {
  const customTabBarStyle = {
    keyboardHidesTabBar: true,
    activeTintColor:Colors.primary,
    inactiveTintColor: '#cdcdcd',
    allowFontScaling: true,
    labelStyle: {  paddingTop: 2,paddingBottom:2},
   showLabel: false ,
   borderTopLeftRadius: 40,
   borderTopRightRadius: 40,
    style: { borderTopLeftRadius:21, 
    borderTopRightRadius:21,
    backgroundColor:"#fff",
    position:'absolute',
    bottom: 0,
    padding:10,
    height: 64,
    zIndex: 8 ,
    shadowOpacity: 10,
    shadowRadius: 10,
   elevation: 15,
    shadowOffset: {
      height: 6,
      width: 1
    }},
  }
  
//   const getUserData = useSelector((state) => state.UserData);

  
  return (
    <Tab.Navigator
      initialRouteName="Doctor"
      screenOptions={customTabBarStyle}
     
    >
      <Tab.Screen
        name="Doctor"
        component={Doctor}
        options={{
          tabBarLabel: 'Doctor',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Patient"
        component={Patient}
         options={{
          tabBarLabel: 'Patient',
          tabBarIcon: ({ color }) => (
            <Fontisto name="bed-patient" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddUser"
        component={AddUser}
         options={{
          tabBarLabel: 'Add User',
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="DocNotification"
        component={DocNotification}
         options={{
          tabBarLabel: 'DocNotification',
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-sharp" color={color} size={26} />
          ),
        }}
      /> */}
    
    
      
    </Tab.Navigator>
  );
}
export default DoctorTab;
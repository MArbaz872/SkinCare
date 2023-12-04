import React,{} from 'react'
import {createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Dimensions,View} from 'react-native';
const {height, width} = Dimensions.get('window');
import { Colors } from '../theme';
import Home from '../screen/BottomTabs/Home';
import Doctor from '../screen/BottomTabs/Doctor';
import More from '../screen/BottomTabs/More';
import ResultScreen from '../screen/BottomTabs/ResultScreen';
// import Call from '../components/Call';

// import { connect, useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const Tabs=()=> {
  const customTabBarStyle = {
    keyboardHidesTabBar: true,
    activeTintColor:Colors.primary,
    inactiveTintColor: '#cdcdcd',
    allowFontScaling: true,
    labelStyle: {  paddingTop: 2,paddingBottom:2},
   showLabel: true ,
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
      width: 1,
      // headerShown:false
    }},
  }
  
//   const getUserData = useSelector((state) => state.UserData);

  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={customTabBarStyle}
     
    >
      <Tab.Screen
        name="Home"
        component={Home}
        
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ResultScreen"
        component={ResultScreen}
         options={{
          tabBarLabel: 'Result',
          tabBarIcon: ({ color }) => (
            <Ionicons name="medkit" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Doctor"
        component={Doctor}
         options={{
          tabBarLabel: 'Doctor',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user-doctor" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Call"
        component={Call}
         options={{
          tabBarLabel: 'Phone',
          tabBarIcon: ({ color }) => (
            <Ionicons name="call-outline" color={color} size={26} />
          ),
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name="More"
        component={More}
         options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => (
            <Feather name="more-horizontal" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
    
    
      
    </Tab.Navigator>
  );
}
export default Tabs;
import React, { memo } from 'react';
import { Image, StyleSheet, View, Alert, SafeAreaView } from 'react-native';
import { Colors } from '../theme';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withSpring } from 'react-native-reanimated';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import Tabs from './Tabs';
import Dashboard from '../screen/BottomTabs/Home';
// const {
//   interpolate,
//   Extrapolate
// } = Animated;
// Import other components and styles as needed

const Stack = createNativeStackNavigator();
const Screens = ({ navigation, style }) => {

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            </View>
          ),
        }}
      >
        <Stack.Screen name="Tabs">{props => <Tabs {...props} />}</Stack.Screen>
        <Stack.Screen name="Dashboard" component={Dashboard} />



      </Stack.Navigator>
    </>
  );
};

export default Screens;
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    // shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
  drawerItem: { flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: 15 },
  drawerLabel: { color: 'white', marginLeft: 20, alignSelf: 'center', marginTop: 5 },
  circle: {
    borderRadius: 100,
    height: 40, width: 40,
    justifyContent: 'center'
  },
  circleimg: {
    borderRadius: 100, marginLeft: 0, marginTop: 50,
    height: 60, width: 60, backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  logout: {
    height: 30, width: 100,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, alignSelf: 'center', marginTop: 5,
    borderRadius: 20, justifyContent: 'center'
  },

});
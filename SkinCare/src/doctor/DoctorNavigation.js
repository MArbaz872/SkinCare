// MyDrawer.js
import React, { useState, useRef } from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DocrorDrawerContent from "./DocrorDrawerContent";
import { Colors } from "../theme";
import Dashboard from "../screen/BottomTabs/Home";
import Patient from "../screen/Patient";
import DoctorTab from "./DoctorTab";

const Stack = createNativeStackNavigator();

const DoctorNavigation = () => {
  const [ShowMenu, setShowMenu] = useState(false);
  const moveTopRight = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const toggleDrawer = () => {
    const newShowMenu = !ShowMenu;
    
    Animated.parallel([
      Animated.timing(scale, {
        toValue: newShowMenu ? 0.7 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(moveTopRight, {
        toValue: newShowMenu ? 230 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setShowMenu(newShowMenu);
  };

  return (
    <View style={styles.main}>
      <View style={{ flex: 1, backgroundColor: "#130C52" }}>
        {/* Drawer */}
        <View style={{flex:1}}>
        <DocrorDrawerContent toggleDrawer={toggleDrawer} />
        </View>
       

        {/* Tab content */}
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            transform: [{ scale: scale }, { translateX: moveTopRight }],
            borderRadius: ShowMenu ? 15 : 0,
          }}
        >
          {/* Tab menu */}
          <View style={styles.menu}>
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={toggleDrawer}
            >
              <MaterialIcons name="menu" size={30} />
            </TouchableOpacity>
          </View>
          
         <DoctorTab/>

        </Animated.View>
      </View>
    </View>
  );
};

export default DoctorNavigation;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#130C52",
  },
  menu: {
    flexDirection: "row",
    marginTop: 50,
  },
});

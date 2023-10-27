import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../theme";



export default function DocNotification(){
    return(
        <View style={{flex:1}}>
        
        <Text style={styles.buttonText}>
        Notification!!!!!
        </Text>
      </View>
    )
}
var styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#000',
      backgroundColor: 'transparent',
    },
  });
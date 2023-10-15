import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { LineChart, BarChart, PieChart, StackedBarChart } from 'react-native-chart-kit';
import firebase from 'firebase/compat';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import the FontAwesome5 icon library

 export default function CustomHeader({ title, onPressBack }) {

    
  return (
    <View style={styles.customHeader}>
      <TouchableOpacity onPress={onPressBack}>
        <FontAwesome5 name="arrow-left" size={20} color="blue" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <View style={{ width: 60 }}></View>
    </View>
  );
}


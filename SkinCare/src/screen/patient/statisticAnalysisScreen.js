import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { LineChart, BarChart, PieChart, StackedBarChart } from 'react-native-chart-kit';
import firebase from 'firebase/compat';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'; 
import { Colors } from '../../theme';

function StatisticScreen() {
  const [Disease, setDisease] = useState([0, 0, 0]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let AllDiseasesArray = [0, 0, 0];
      firebase
        .firestore()
        .collection("result")
        .where("currentMonth", "==", `${new Date().getUTCMonth() + 1}/${new Date().getFullYear()}`)
        .onSnapshot((snapshot) => {
          snapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.data().result === "Acne") {
              AllDiseasesArray[0] = AllDiseasesArray[0] + 1;
            }
            if (documentSnapshot.data().result === "Eczema") {
              AllDiseasesArray[1] = AllDiseasesArray[1] + 1;
            }
            if (documentSnapshot.data().result === "Psoriasis") {
              AllDiseasesArray[2] = AllDiseasesArray[2] + 1;
            }
          });
          setDisease(AllDiseasesArray);
        });
    });
    return unsubscribe;
  }, [setDisease, navigation]);

  const MyBezierLineChart = () => {
    console.log(Disease, "Disease");
    return (
      <View>
        <Text style={styles.header}>Bezier Line Chart for Predicted Diseases</Text>
        <LineChart
          data={{
            labels: ['Acne', 'Eczema', 'Psoriasis'],
            datasets: [
              {
                data: Disease,
                strokeWidth: 2,
              },
            ],
            legend: ["Skin Diseases Cases"],
          }}
          width={Dimensions.get("window").width - 16}
          height={220}
          yAxisLabel={''}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 0,
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  };

  const MyLineChart = () => {
    return (
      <>
        <Text style={styles.header}>Line Chart for Predicted Diseases</Text>
        <LineChart
          data={{
            labels: ['Acne', 'Eczema', 'Psoriasis'],
            datasets: [
              {
                data: Disease,
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    );
  };

  const MyBarChart = () => {
    return (
      <>
        <Text style={styles.header}>Bar Chart for Predicted Diseases</Text>
        <BarChart
          data={{
            labels: ['Acne', 'Eczema', 'Psoriasis'],
            datasets: [
              {
                data: Disease,
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          yAxisLabel={''}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    );
  };

  const MyStackedBarChart = () => {
    return (
      <>
        <Text style={styles.header}>Stacked Bar Chart for Predicted Diseases</Text>
        <StackedBarChart
          data={{
            labels: ['Acne', 'Eczema', 'Psoriasis'],
            legend: ['Acne', 'Eczema', 'Psoriasis'],
            data: [
              [60],
              [30],
              [50],
            ],
            barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    );
  };

  const MyPieChart = () => {
    return (
      <>
        <Text style={styles.header}>Pie Chart for Predicted Diseases</Text>
        <PieChart
          data={[
            {
              name: 'Acne',
              population: Disease[0],
              color: '#dfe4ea',
              legendFontColor: '#7F7F7F',
              legendFontSize: 10,
            },
            {
              name: 'Eczema',
              population: Disease[1],
              color: '#ced6e0',
              legendFontColor: '#7F7F7F',
              legendFontSize: 10,
            },
            {
              name: 'Psoriasis',
              population: Disease[2],
              color: '#a4b0be',
              legendFontColor: '#7F7F7F',
              legendFontSize: 10,
            },
          ]}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
      <View style={styles.customHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="menu" size={25} color="gray" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Statistics</Text>
      <View style={{ width: 60 }}></View>
    </View>
        <View style={styles.container}>
          {/* Header */}
         

          {/* Charts */}
          <View>
            <MyBezierLineChart />
            <MyLineChart />
            <MyBarChart />
            <MyStackedBarChart />
            <MyPieChart />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  headerContainer: {
    width:'20%',
    height:'3%',
    padding: 10,
  },
  backButton: {
    fontSize: 16,
    color: 'blue',
    // backgroundColor:'red',
    width:'100%',
    height:'100%'
     // You can set the color you prefer
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
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});

export default StatisticScreen;

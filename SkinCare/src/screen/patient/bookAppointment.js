import React,{useState} from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { RadioButton } from "react-native-paper";
import Dropdown from "../../components/Dropdown";
import firebase from "firebase/compat";
import Modal from "react-native-modal";
// import database from '@react-native-firebase/database';
import { SendNotification4 } from "../../components/PushNotification";
export default function BookAnAppointment({ route, navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
    const docId = route.params.doc_id;
  const { currentUserId } = route.params;
  const [checked, setChecked] = React.useState("first");
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Age, setAge] = React.useState("");
  const [PhoneNumber, setPhoneNumber] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const TimeData = [
    { key: 4, label: "1:00 PM" },
    { key: 5, label: "1:30 PM" },
    { key: 6, label: "2:00 PM" },
    { key: 42, label: "2:30 PM" },
    { key: 3, label: "3:00 PM" },
    { key: 8, label: "3:30 PM" },
    { key: 12, label: "4:00 PM" },
    { key: 121, label: "4:30 PM" },
    { key: 235432, label: "5:00 PM" },
    { key: 23423, label: "5:30 PM" },
    { key: 657, label: "6:00 PM" },
    { key: 88, label: "6:30 PM" },
    { key: 61, label: "7:00 PM" },
    { key: 60, label: "7:30 PM" },
    { key: 40, label: "8:00 PM" },
    { key: 609, label: "8:30 PM" },
    { key: 214, label: "9:00 PM" },
  ];

  const [card, setCard] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [myEmail, setMyEmail] = useState('');


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
console.log("doctorid=====>",docId)
  const BookAppointment = () => {
   
  

  };

  const [Time, setTime] = React.useState("Pick Time");
  // console.log("time---->",Time)

  React.useEffect(() => {
    console.log("doc id--->",docId);
  }, []);

  const cc_format_date = (value) => {
    // Remove non-numeric characters
    const formattedValue = value.replace(/\D/g, '');
    
    // Format the expiration date as MM/YY
    if (formattedValue.length > 2) {
      const mm = formattedValue.substring(0, 2);
      const yy = formattedValue.substring(2, 4);
      setExpiry(`${mm}/${yy}`);
    } else {
      setExpiry(formattedValue);
    }
  };

  const cc_format = (value) => {
    // Remove non-numeric characters
    const formattedValue = value.replace(/\D/g, '');

    // Format the card number with spaces every 4 digits
    const parts = [];
    for (let i = 0; i < formattedValue.length; i += 4) {
      parts.push(formattedValue.substring(i, i + 4));
    }
    setCard(parts.join(' '));
  };


  const payment_submit = () => {
    if (card == ''){
      Alert.alert("Enter Card Number")
      return
    }
    if (cvc == ''){
      Alert.alert("Enter CVC Number")
      return
    }
    if (expiry == ''){
      Alert.alert("Enter expiry Date")
      return
    }
    if (FirstName == ''){
      Alert.alert("Enter FirstName ")
      return
    }
    
    // Create a data object with the information to send to your API
    const data = {
      amount: 5455,
      customer_email: 'kashif@gmail.com',
      customer_name: 'Shayan Niaz',
      token: 'tok_1O0SljCdlGAtLq3UVrUBSPlb',
    };
  
    fetch('https://stripephpapi.000webhostapp.com/stripe.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Payment failed');
        }
      })
      .then((data) => {
        // Handle a successful response here, e.g., show a success message
        console.log("Payment response her=======?>",data.message)
        
        // if(data.message == 'The token tok_1O0SljCdlGAtLq3UVrUBSPlb has already been used. Each token can only be used once to create a source.')
        // {
          Alert.alert("Payment successful")
          if (
            FirstName === "" ||
            LastName === "" ||
            Age === "" ||
            Address === "" ||
            PhoneNumber === "" ||
            checked === "" ||
            TimeData === ""
          ) {
            alert("Enter All Fields in From");
          } else {
            try {
              console.log("hit->",
              docId,
                FirstName,
                LastName,
                Age,
                PhoneNumber,
                Address,
                checked,
                Time
              );
              firebase
              // alert("before")
                // .database()
                .database()
                .ref("Appointment/")
                .push({
                  doc_id: docId,
                  FirstName: FirstName,
                  LastName: LastName,
                  Age: Age,
                  PhoneNumber: PhoneNumber,
                  Address: Address,
                  Checked: checked,
                  Time: Time,
                })
                .then((data) => {
                  setFirstName('')
                  setLastName('')
                  setAge('')
                  setPhoneNumber('')
                  setAddress('')
                  setChecked('')
                  SendNotification4()
                  // alert('Appointment Booked')
      
                  console.log("data",data);
                  // SendNotification(expoPushToken);
                  // PushTokenInFirebase(expoPushToken);
                });
            } catch (error) {
              alert("error")
              console.log("error--------->",error);
            }
          }
        // }
        // else(
        //   Alert.alert('Payment successful')
        // )
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
        Alert.alert('Payment failed. Please try again later.');
      });
  };
  return (
    <View
      style={{ flex: 1, }}
    >
         <View style={styles.customHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={25} color="gray" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Book Appointment</Text>
      <View style={{ width: 60 }}></View>
    </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#05375a" size={20} />
        <TextInput
          placeholder="First Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(val) => setFirstName(val)}
          value={FirstName}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#05375a" size={20} />
        <TextInput
          placeholder="Last Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(val) => setLastName(val)}
          value={LastName}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#05375a" size={20} />
        <TextInput
          placeholder="Age"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(val) => setAge(val)}
          value={Age}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#05375a" size={20} />
        <TextInput
          placeholder="Address"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(val) => setAddress(val)}
          value={Address}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#05375a" size={20} />
        <TextInput
          placeholder="contact Number"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(val) => setPhoneNumber(val)}
          value={PhoneNumber}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <RadioButton
          value="first"
          status={checked === "Male" ? "checked" : "unchecked"}
          onPress={() => setChecked("Male")}
        />
        <Text style={{ marginTop: 7 }}>Male</Text>
        <RadioButton
          value="second"
          status={checked === "Female" ? "checked" : "unchecked"}
          onPress={() => setChecked("Female")}
        />
        <Text style={{ marginTop: 7 }}>Female</Text>
      </View>
      <View style={styles.dropdown_row}>
        <Text>Select Time</Text>
        <Dropdown
          data={TimeData}
          // initValue={"Select Time"?.Time}
          initValue={Time == undefined ? 'Select Time' : Time}
          onChange={(option) => {
            setTime(option.label);
          }}
          style={{
            ...styles.text,
            ...styles.value_width,
          }}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.signIn}
          // onPress={() => BookAppointment()}
          onPress={() =>toggleModal()}
        >
          <LinearGradient colors={["#130C52", "#245e46"]} style={styles.signIn}>
            <Text style={[styles.textSign, { color: "#fff" }]}>Book</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>


      <Modal isVisible={isModalVisible}>
  <View style={styles.modalContainer}>
    <View style={styles.modalCard}>
      <Text style={styles.modalHeaderText}>ATM Card Details</Text>
      <TextInput
        placeholder="Card Number"
        value={card}
        maxLength={19}
        style={styles.inputField}
        keyboardType="numeric"
        onChangeText={(text) => cc_format(text)}
      />
      <TextInput
        placeholder="CVV"
        style={styles.inputField}
        keyboardType="numeric"
        maxLength={3}
        onChangeText={(text) => setCvc(text)}
      />
      <TextInput
        placeholder="Cardholder Name"
        style={styles.inputField}
      />
      <TextInput
        placeholder="Expiry Date (MM/YY)"
        style={styles.inputField}
        keyboardType="numeric"
        maxLength={5}
        value={expiry}
        onChangeText={(text) => cc_format_date(text)}
      />
       <TouchableOpacity
          style={styles.signIn}
          // onPress={() => BookAppointment()}
          onPress={() => payment_submit()}
        >
     <LinearGradient colors={["#130C52", "#245e46"]} style={styles.signIn}>
            <Text style={[styles.textSign, { color: "#fff" }]}>Pay</Text>
          </LinearGradient></TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
      <Text style={styles.closeButtonText}>Close</Text>
    </TouchableOpacity>
  </View>
</Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdown_row: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  value_width: {
    width: "60%",
  },
  customHeader:{
    flexDirection:'row',
    width:'100%',
    height:'7%',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#130C52',
    elevation:10

  },
  backIcon:{
    color:'white'

  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white'
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputField: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
  saveButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

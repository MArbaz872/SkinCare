import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";
import firebase from "firebase/compat";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Ionicons from "react-native-vector-icons/Ionicons";
// import PDFView from 'react-native-view-pdf'; 
import Share from 'react-native-share';
import Spinner from 'react-native-loading-spinner-overlay';

function ResultScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState("");
  const [image, setImage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const user = firebase.auth().currentUser;
  const [pdfPath, setPdfPath] = useState(null);
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {

      fetchData()
     

  }, [refresh]);
  const resultParts = result.split(': ');
  const condition = resultParts[0];
  // console.log(condition, "fkdmfkm")
  const refreshData = () => {
   setSpinner(true)
    // Call setRefresh to trigger a refresh
    fetchData()
    setRefresh(true);
  };
  const fetchData = () => {
    firebase
    .firestore()
    .collection("report")
    .where("user_id", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        setName(documentSnapshot.data().name);

        setEmail(documentSnapshot.data().email);

        setAge(documentSnapshot.data().age);
        setGender(documentSnapshot.data().gender);

        setCity(documentSnapshot.data().city);

        setCountry(documentSnapshot.data().country);

        setPhone(documentSnapshot.data().phone);
        console.log('fsfsdfsd')
        setResult(documentSnapshot.data().prediction);
        setImage(props.route.params?.image);
        setSpinner(false)

      }); });
  };
  const generatePDF = async () => {
    setSpinner(true)
    let options = {
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #ffffff;
                  margin: 0;
                  padding: 0;
              }
      
              header {
                  color: #861E51;
                  background-color: rgba(134,30,81,.20);
                  padding: 10px;
                  text-align: center;
              }
      
              h1 {
                  font-size: 24px;
              }
      
              p {
                  font-size: 16px;
                  line-height: 1.5;
                  margin: 20px;
              }
              .container {
              }
      
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
              }
      
              th, td {
                  padding: 10px;
                  text-align: left;
                  border-bottom: 1px solid #ddd;
              }
      
              th {
                  color: #000000;
                  text-align: center;
              }
              /* styles.css */
              .row-even {
                  background-color: rgba(134, 30, 81, 0.1);
              }

              .row-odd {
                  background-color: #ffffff;
              }

          </style>
      </head>
      <body>
          <header>
              <h1>Report</h1>
          </header>
          <div  style="max-width: 800px; margin: 20px auto; padding: 20px; background-color: #ffffff; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4) border-radius: 30px; border: 1px solid #ddd;">
              <table>
                  <thead>
                      <tr>
                          <th>Report By :</th>
                          <th> Skin Detact AI</th>
                      </tr>
                  </thead>
                  <tbody>
                  
                  <tr class='row-odd' >
                     <td>Name</td>
                      <td>${name}</td>
                    
                  </tr>
                  <tr class='row-even'>
                     <td>Email</td>
                      <td>${email}</td>
                  </tr>
                  <tr class='row-odd' >
                  <td>City</td>
                   <td>${city}</td>
                 
               </tr>
               <tr class='row-even'>
                  <td>Country</td>
                   <td>${country}</td>
               </tr>
               <tr class='row-odd' >
               <td>Age</td>
                <td>${age}</td>
              
            </tr>
            <tr class='row-even'>
               <td>Gender</td>
                <td>${gender}</td>
            </tr>
            <tr class='row-odd' >
            <td>Phone No #</td>
             <td>${phone}</td>
           
         </tr>
         <tr class='row-even'>
            <td>Result</td>
             <td>${result}</td>
         </tr>
                  </tbody>
              </table>
          </div>
      </body>
      </html>
      `,
      fileName: 'SkinDetact'+condition,
      directory: 'Phone',
    };

    let file = await RNHTMLtoPDF.convert(options)
    try {
      const shareOptions = {
        title: 'Share via',
        // message: 'Check out this PDF',
        url: `file://${file.filePath}`,
        type: 'application/pdf',
      };

      // setSpinner(false)
      setTimeout(() => {
        setSpinner(false)
        Share.open(shareOptions)
          .then((res) => {
            console.log("yeh arha hai respons s  = = ", res);
            if (res && res.action === Share.sharedAction) {
              setSpinner(false)
              console.log('Share Result:', res);
            } else if (res && res.action === Share.dismissedAction) {
              console.log('User canceled sharing');
              setSpinner(false)
            } else {
              console.log('Share Result:', res);
              setSpinner(false)
            }
          })
          .catch((err) => {
            console.log('Share Error:', err);
            setSpinner(false)
          });
      }, 500)


    } catch (error) {
      setSpinner(false)
      GeneralError(error.message, "Error!")
      console.log('Error sharing PDF:', error.message);

    }
    console.log(file.filePath);
  };
  return (
    <>
      <View style={styles.container}>
      {/* {pdfPath && (
          // Render PDFView component if pdfPath is available
          <PDFView
            fadeInDuration={250.0}
            style={{ flex: 1 }}
            resource={pdfPath}
            resourceType="file"
            onLoad={() => console.log(`PDF rendered from ${pdfPath}`)}
          />
        )} */}
        <View style={{width:'60%',flexDirection:'row'}}>
        <Text style={styles.title}>Report</Text>
        <TouchableOpacity style={{top:20,left:10}} onPress={refreshData}>
              <Ionicons name="reload" size={20}  />
            </TouchableOpacity>
            </View>
        <View style={[styles.colView, { justifyContent: "space-between" }]}>
          <View>
            <Text style={styles.fieldTitle}>NAME:</Text>
            <Text style={styles.field}>{name}</Text>
          </View>
          <View>
            <Text style={styles.fieldTitle}>EMAIL:</Text>
            <Text style={styles.field}>{email}</Text>
          </View>
        </View>
        <View style={styles.colView}>
          <View>
            <Text style={styles.fieldTitle}>ADDRESS:</Text>
            <Text style={styles.field}>{city}</Text>
          </View>
          <View style={{ marginLeft: 50 }}>
            <Text style={styles.fieldTitle}>CONTACT:</Text>
            <Text style={styles.field}>{phone}</Text>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text style={styles.fieldTitle}>RESULT: </Text>
            <Text style={styles.field}>{result ? result : "Loading"}</Text>
          </View>
          {/* <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Text style={styles.fieldTitle}>Disease: </Text>
                        <Text style={styles.field}>Acne</Text>
                    </View> */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text style={styles.fieldTitle}>Cure: </Text>
            {/* 'Acne', 'Eczema', 'Healthy', 'Psoriasis' */}
            {condition == "Acne" ? (
              <Text style={styles.field}>
                Medications: Isotretion Cream. Clindamycin Plus Tetrinoin. Apply
                to affected areas once or twice daily or as directed by a
                dermatologist
              </Text>
            ) : condition == "Eczema" ? (
              <Text style={styles.field}>
                Medications: Hydrophil Lotion. Hydrocortisone Cream.Apply to
                affected areas once or twice daily or as directed by a
                dermatologist
              </Text>
            ) : condition == "Psoriasis" ? (
              <Text style={styles.field}>
                Medications: Topical Steroids Cream. Hydrocortisone.Apply to
                affected areas once or twice daily or as directed by a
                dermatologist
              </Text>
            ) : (
              <Text>You don't need any medication</Text>
            )}
          </View>
        </View>
      </View>
     
      <View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            height: 80,
            backgroundColor: "white",
          },
        ]}
      >
         <Spinner
        visible={spinner}
        // textContent={'Generating PDF...'}
        textStyle={{ color:'#05375a', fontFamily:'semiBold' }}

      />
        <Button title="Download" color="#05375a" onPress={generatePDF} />
        {/* <Button title="Refresh" color="#05375a"  /> */}
      </View>
      </>
  )
}

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    justifyContent: "space-around",
    paddingTop: 10,
  },
  field: {
    // width:"100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent:'center',
    // backgroundColor:'pink',
    right:5
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#009387",
  },
  fieldTitle: {
    fontWeight: "bold",
  },
  colView: {
    flexDirection: "row",
  },
});

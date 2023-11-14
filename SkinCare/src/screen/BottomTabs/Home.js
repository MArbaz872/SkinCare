import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableNativeFeedback, Image, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase/compat';
import { Cameraper } from '../../components/Permission';
import { SendNotification2 } from '../../components/PushNotification';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

function Home({ navigation }) {
  const [description, setDescription] = useState('');
  const [imageResponse, setImageResponse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [permission, setpermission] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [userDataModalContent, setUserDataModalContent] = useState(null); // State to store user data for the modal
  const [prediction, setprediction] = useState(''); // State to store user data for the modal
  const user = firebase.auth().currentUser;

  const [userData, setUserData] = useState({
    name: '',
    id: '',
    age: '',
    city: '',
    country: '',
    email: '',
    gender: '',
    phone: '',
  });

  useEffect(async () => {
    firebase
    .firestore()
    .collection("users")
    .where("user_id", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        setUserData({
          name: documentSnapshot.data().name,
          id: documentSnapshot.data().user_id,
          age: documentSnapshot.data().age,
          city: documentSnapshot.data().city,
          country: documentSnapshot.data().country,
          email: documentSnapshot.data().email,
          gender: documentSnapshot.data().gender,
          phone: documentSnapshot.data().phone,
        });
      });
    });

    SendNotification2()
    // return unsubscribe;
    Cameraper().then(res => {
      setpermission(res)
    }).catch(error => {
      console.log('Error:', error);
      return
    });
  }, []);

  const OpenModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openCamera = async () => {
    try {
      setIsOpen(true);
  
      const options = {
        storageOptions: {
          path: 'images',
          mediaType: 'photo',
        },
        includeBase64: false,
      };
  
      launchCamera(options, async (response) => {
        setIsOpen(false);
        setIsModalVisible(false);
  
        if (!response.didCancel) {
          const imageUri = response.assets[0];
  
          try {
            const apiUrl = 'http://3.91.227.53:8000/'; // Update the API endpoint
  
            const formData = new FormData();
            formData.append('image', {
              uri: imageUri.uri,
              type: imageUri.type, // Update the type if needed
              name: imageUri.fileName, // Update the name if needed
            });
  
            const apiResponse = await fetch(apiUrl, {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
              },
            });
  
            const responseData = await apiResponse.json(); // assuming the server returns JSON
  
            console.log('Server Response:', responseData);
  
            if (apiResponse.ok) {
              setIsModalVisible(false);
            setprediction(responseData)
            console.log('Image sent successfully.',responseData);
            setTimeout(() => {
              setIsModalVisible2(true)
            }, 2000);
            } else {
              console.log(
                'Failed to send image. Server returned:',
                apiResponse.status,
                apiResponse.statusText
              );
              // Handle the failure case here
            }
          } catch (error) {
            console.log('Error during image upload:', error);
  
            if (
              error instanceof TypeError &&
              error.message === 'Network request failed'
            ) {
              console.log(
                'Network request failed. Check network connectivity and server availability.'
              );
            }
          }
        }
      });
    } catch (error) {
      console.error('Error during camera launch:', error);
      // Handle other camera launch errors
    }
  };
  


 // ... (previous code)

const openImageGallery = async () => {
  if (isOpen) {
    return;
  }

  setIsOpen(true);

  launchImageLibrary(
    {
      mediaType: 'photo',
      multiple: false,
      includeBase64: false,
    },
    async (response) => {
      setIsOpen(false);
      setIsModalVisible(false);

      if (!response.didCancel) {
        const imageUri = response.assets[0];

        try {
          if (!imageUri) {
            console.log('No image to send.');
            return;
          }

          const apiUrl = 'http://3.91.227.53:8000/'; // Update the API endpoint

          const formData = new FormData();
          formData.append('image', {
            uri: imageUri.uri,
            type: imageUri.type, // Update the type if needed
            name: imageUri.fileName, // Update the name if needed
          });

          const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
            },
          });

          const responseData = await response.json(); // assuming the server returns JSON

          console.log('Server Response:', responseData);

          if (response.ok) {
            setIsModalVisible(false);
            setprediction(responseData)
            console.log('Image sent successfully.',responseData);
            setTimeout(() => {
              setIsModalVisible2(true)
            }, 2000);
            
            
            // You can handle the success case here
          } else {
            console.log(
              'Failed to send image. Server returned:',
              response.status,
              response.statusText
            );
            // You can handle the failure case here
          }
        } catch (error) {
          console.log('Error during image upload:', error);
          if (
            error instanceof TypeError &&
            error.message === 'Network request failed'
          ) {
            console.log(
              'Network request failed. Check network connectivity and server availability.'
            );
          }
        }
      }

      setIsModalVisible(false);
    }
  );
};

// ... (remaining code)
  // Second Modal
  const renderUserDataModalContent = () => {
    return (
      <View style={styles.userDataContainer}>
        <Text style={styles.userDataTitle}>Report</Text>
        <View style={styles.userDataItem}>
          <Text style={styles.userDataLabel}>Name:</Text>
          <Text style={styles.userDataValue}>{userData.name}</Text>
        </View>
        <View style={styles.userDataItem}>
          <Text style={styles.userDataLabel}>Prediction:</Text>
          <Text style={styles.userDataValue}>{prediction.prediction}</Text>
        </View>
        {/* <View style={styles.userDataItem}>
          <Text style={styles.userDataLabel}>ID:</Text>
          <Text style={styles.userDataValue}>{userData.id}</Text>
        </View> */}
        <View style={styles.userDataItem}>
          <Text style={styles.userDataLabel}>Age:</Text>
          <Text style={styles.userDataValue}>{userData.age}</Text>
        </View>
        <View style={styles.userDataItem}>
          <Text style={styles.userDataLabel}>City:</Text>
          <Text style={styles.userDataValue}>{userData.city}</Text>
        </View>
        <View style={styles.userDataItem}>
          <Text style={styles.userDataLabel}>Country:</Text>
          <Text style={styles.userDataValue}>{userData.country}</Text>
        </View>
        <View style={styles.userDataItem}>
          <Text style={styles.userDataLabel}>Email:</Text>
          <Text style={styles.userDataValue}>{userData.email}</Text>
        </View>
        <View style={styles.userDataItem}>
          <Text style={styles.userDataLabel}>Gender:</Text>
          <Text style={styles.userDataValue}>{userData.gender}</Text>
        </View>
        <View style={styles.userDataItem}>
          <Text style={styles.userDataLabel}>Phone:</Text>
          <Text style={styles.userDataValue}>{userData.phone}</Text>
        </View>
       
  
        <TouchableOpacity
          style={styles.modalOption}
          onPress={() => setIsModalVisible2(!isModalVisible2)}
        >
          <Text style={styles.modalOptionText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return <View style={styles.maincontainer}>
    <View style={styles.dataDiv}>
      <TouchableNativeFeedback onPress={() => { OpenModal() }}>
        <LinearGradient colors={["#130C52", "#245e46"]} style={[styles.customDiv]}>
          <Text style={{ color: "white", fontSize: 40 }}>+</Text>
        </LinearGradient>
      </TouchableNativeFeedback>
      <Text>Add new images</Text>
      <View style={styles.Image}>
        {imageResponse && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${imageResponse}` }}
            style={styles.selectedImage}
          />
        )}
      </View>
    </View>

    <Modal visible={isModalVisible} transparent={true} animationType="fade">
      <TouchableOpacity style={styles.modalContainer} onPress={closeModal} >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalOption} onPress={() => openCamera()}>
              <Text style={styles.modalOptionText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => openImageGallery()}>
              <Text style={styles.modalOptionText}>Image Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => closeModal()}>
              <Text style={styles.modalOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>


    <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible2}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsModalVisible2(!isModalVisible2);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          {renderUserDataModalContent()}
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsModalVisible2(!isModalVisible2)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>

  </View>
}
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 25
  },
  customDiv: {
    height: 100, width: 100,
    backgroundColor: "tomato",
    borderRadius: 10,
    justifyContent: "center", alignItems: "center",
  }, dataDiv: {
    width: 120,
    alignItems: "center",
    // backgroundColor:"gold",
    // borderWidth:1, 
    // marginLeft:30,
    marginTop: 25,
    textAlign: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',

  },
  modalContent: {
    height: '25%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    elevation: 5,
  },
  Image: {
    width: '36%',
    height: '15%',
    alignItems: 'center'
  },
  userDataContainer: {
    padding: 10,
    backgroundColor: '#fff',
    // borderRadius: 10,
    // elevation: 5,
  },
  userDataTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userDataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userDataLabel: {
    fontWeight: 'bold',
  },
  userDataValue: {
    marginLeft: 10,
  },
  modalOption: {
    marginTop: 15,
    backgroundColor: '#130C52',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    top: 20
  },
  modalOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Home;
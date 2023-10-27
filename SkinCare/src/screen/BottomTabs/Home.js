import React, {useEffect, useState} from 'react';
import {View,StyleSheet, Button,Text, TouchableNativeFeedback,Image, TouchableOpacity, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase/compat';
import { Cameraper } from '../../components/Permission';
import { SendNotification2 } from '../../components/PushNotification';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

function Home({navigation}) {
    const [description, setDescription] = useState('');
    const [imageResponse, setImageResponse] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [permission, setpermission] = useState('');
    const [isOpen, setIsOpen] = useState(false);

  useEffect( async() => {
   ok
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

  const openCamera = () => {
    if (isOpen) {
      return; 
    }
    setIsOpen(true);
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchCamera(options, (response) => {
      setIsOpen(false);
      setIsModalVisible(false);
      if (!response.didCancel) {//camera kholl ke, tasweer nahi lena aur back krdena(work ok)
        const imageUri = response.assets[0].base64;
        setImageResponse(imageUri);
        setIsModalVisible(false);
      }
    });
  };


  const openImageGallery = () => {
    if (isOpen) {
      return;
    }

    setIsOpen(true);
    launchImageLibrary({
      mediaType: 'photo',
      multiple: false,
      includeBase64: true
    },
      (response) => {
        setIsOpen(false)
        if (!response.didCancel) {
          const imageUri = response.assets[0].base64;
          setImageResponse(imageUri);
        }
        setIsModalVisible(false);
      });
  };


return <View style={styles.maincontainer}>
     <View style={styles.dataDiv}>
        <TouchableNativeFeedback onPress={()=>{OpenModal()}}>     
            <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={[styles.customDiv]}>
                <Text style={{color:"white",fontSize:40}}>+</Text>
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
              <TouchableOpacity style={styles.modalOption} disabled={!permission} onPress={() =>  openCamera()}>
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
 
</View>
}
const styles = StyleSheet.create({
    maincontainer: {
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-between",
        padding:25
    },
    customDiv:{
        height:100,width:100,
        backgroundColor:"tomato",
        borderRadius:10,
        justifyContent:"center",alignItems:"center",
    },dataDiv:{
        width:120,
        alignItems:"center",
        // backgroundColor:"gold",
        // borderWidth:1, 
        // marginLeft:30,
        marginTop:25,
        textAlign:"center"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    
      },
      modalContent: {
        height: '20%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        elevation: 5,
      },
      modalOption: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalOptionText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
      },
      Image: {
        width: '36%',
        height: '15%',
        alignItems: 'center'
      },
});
export default Home;
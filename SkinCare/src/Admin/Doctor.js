import React, { useState, useEffect } from "react";
import firebase from "firebase/compat";
import { SafeAreaView, ScrollView, Text, StyleSheet, View, Pressable, Alert, ActivityIndicator } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from "../theme";
import { SendNotification6, SendNotification7 } from "../components/PushNotification";

const Patient = ({ navigation }) => {
    const [Doc, setDoc] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        // Fetch Doctor users from Firestore
       fetch()
    }, []);

    const fetch = () => {
        firebase.firestore()
        .collection("users")
        .where("designation", '==', "Doctor")
        .get()
        .then(querySnapShot => {
            const doctors = [];
            querySnapShot.forEach(documentSnapShot => {
                const data = documentSnapShot.data();
                doctors.push({ name: data.name, uid: documentSnapShot.id, isBlock: data.isBlock });
            });
            setDoc(doctors);
            setLoading(false); // Hide loading indicator once data is fetched
        })
        .catch(error => {
            setLoading(false); // Hide loading indicator if there's an error
            console.error("Error fetching data:", error);
        });
    }

    const onPressBlock = (uid) => {
        setLoading(true); // Show loader while blocking
        // Block the user by updating Firestore
        const userRef = firebase.firestore().collection("users").doc(uid);
        userRef.update({ isBlock: 1 })
            .then(() => {
                SendNotification6()
                fetch()
               
                setLoading(false); // Hide loader after blocking
                // Alert.alert("User has been blocked");
            })
            .catch((error) => {
                
                setLoading(false); // Hide loader if there's an error
                Alert.alert("Error blocking user: " + error.message);
            });
    }

    const onPressUnBlock = (uid) => {
        setLoading(true); // Show loader while unblocking
        // Unblock the user by updating Firestore
        const userRef = firebase.firestore().collection("users").doc(uid);
        userRef.update({ isBlock: 0 })
            .then(() => {
                SendNotification7()
                fetch()
                setLoading(false); // Hide loader after unblocking
                // Alert.alert("User has been unblocked");
            })
            .catch((error) => {
                setLoading(false); // Hide loader if there's an error
                Alert.alert("Error unblocking user: " + error.message);
            });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {loading ? ( // Show loader when data is loading
                    <ActivityIndicator size="large" color={Colors.parrotGreenColor} />
                ) : (
                    Doc.map((item, key) => (
                        <View style={styles.container} key={key}>
                            <View style={styles.CArd} >
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#130C52' }}>{item.name}</Text>
                                {item.isBlock === 0 ? (
                                    <Pressable
                                        style={[styles.bottomButton, { marginRight: 5, top: 10 }]}
                                        onPress={() => onPressBlock(item.uid)}
                                    >
                                        <Entypo
                                            name="block"
                                            color={Colors.parrotGreenColor}
                                            size={17}
                                            style={{ alignSelf: 'center' }}
                                        />
                                    </Pressable>
                                ) : (
                                    <Pressable
                                        style={[styles.bottomButton, { marginRight: 5, top: 10 }]}
                                        onPress={() => onPressUnBlock(item.uid)}
                                    >
                                        <Entypo
                                            name="check"
                                            color={Colors.parrotGreenColor}
                                            size={17}
                                            style={{ alignSelf: 'center' }}
                                        />
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    CArd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingTop: 5,
        paddingLeft: 10, paddingRight: 10,
        margin: 0,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    }
});

export default Patient;

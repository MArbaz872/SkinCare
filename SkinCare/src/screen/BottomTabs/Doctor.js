// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat";
import { LinearGradient } from "expo-linear-gradient";

import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
// import all the components we are going to use
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";
import Input from "../../components/InputWithIcon";
import { SearchBar } from "react-native-elements";
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import Feather from 'react-native-vector-icons/Feather'; 


const Doctor = ({ route,navigation }) => {
    const [doctorList, setDoctorList] = useState([{}]);
    const [DocId, setDocId] = React.useState();
    const [isFav, setIsFav] = React.useState(false);
    const [checkFav, setCheckFav] = React.useState(false);

    const user = firebase.auth().currentUser;
    console.log("Doc screennn details----->",user.uid);
    useEffect(() => {
        var arr = [];
     
        firebase
            .firestore()
            .collection("users")
            .where("designation", "==", "Doctor")
            .get()
            .then((querySnapShot) => {
                querySnapShot.forEach((documentSnapShot) => {
                    arr.push({
                        
                        name: documentSnapShot.data().name,
                        uid: documentSnapShot.data().user_id,
                        check_favorite: false,
                    });
                });
                setDoctorList(arr);
                setDocId(arr.uid);
            }).catch((error) => {
                console.log("Error-->",error)
            })
    }, []);
    const AddToFav = (userId, docId) => {
        try {
            firebase
                .database()
                .ref("CheckFav/")
                .set({
                    userId: userId,
                    docId: docId,
                    checkFav: checkFav,
                })
                .then((data) => { });
        } catch (error) {
            console.log(error);
        }
    };
    const [refresh, setRefresh] = React.useState(false);
    
    return (
      
           <>
            <Input
                image={"search"}
                placeholder="Search"
                onFocus={() => navigation.navigate("SearchScreen")}
            />

            <FlatList
                data={doctorList}
                extraData={refresh}
                renderItem={({ item }) => {
                    return (
                        <Card
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: "#130C52",
                                flexDirection: "row",
                                borderWidth: 1,
                                marginTop: 10,
                                elevation:10
                            }}
                            // onPress={() =>
                            //     navigation.navigate("ChatOrAppointment", {
                            //         name: item.name,
                            //         otherUserId: item.uid,
                            //         currentUserId: user.uid,
                            //     })
                            // }
                        >
                              <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-evenly',}}>
                            <Text
                                style={{ fontSize: 20, fontWeight: "bold", color: "#130C52" }}
                            >
                                {/* {console.log("here item===>",item)} */}
                                {item.name}
                                {/* {item.uid} */}
                         
                            </Text>
                            <TouchableOpacity
                                     onPress={() =>
                                        navigation.navigate("Chat", {
                                          name: item.name,
                                          otherUserId:item.uid,
                                          currentUserId: user.uid,
                                        })
                                      }
                                >
                                    <Feather name="message-square" size={20} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("BookAnAppointment", {doc_id: item.uid })
                                      }
                                >
                                    <FontAwesome name="calendar-plus-o" size={20} color="black" />
                                </TouchableOpacity>
                          
                                 {item.check_favorite ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("before1", item.check_favorite);
                                        !item.check_favorite;
                                        setRefresh(!refresh);
                                        console.log("after1", item.check_favorite);
                                    }}
                                >
                                    <AntDesign name="heart" size={20} color="black" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("before2", item.check_favorite);
                                        !item.check_favorite;
                                        setRefresh(!refresh);
                                        console.log("after2", item.check_favorite);
                                    }}
                                >
                                    <AntDesign name="hearto" size={20} color="black" />
                                </TouchableOpacity>
                            )}
                            </View>
                           
                        </Card>
                    );
                }}
            />
            </>
        // </ScrollView>
    );

{/* <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />*/}
// {checkFav ? (
//   <TouchableHighlight
//     style={{ margin: 10, alignSelf: "flex-end" }}
//     onPress={() => {
//         setCheckFav(false);
//     }}
//   >
//     <FontAwesome name="heart" size={30} color="black" />
//   </TouchableHighlight>
// ) : (
//   <TouchableHighlight
//     style={{ margin: 10, alignSelf: "flex-end" }}
//     onPress={() => {
//       AddToFav(item.uid, user.uid);
//     }}
//   >
//     <FontAwesome name="heart-o" size={30} color="pink" />
//   </TouchableHighlight>
// )}

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 20,
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
        marginBottom: 10,
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
    button: {
        alignItems: "flex-start",
        marginTop: 5,
        paddingLeft: 20,
    },
    item: {
        marginTop: 24,
        padding: 30,
        backgroundColor: "pink",
        fontSize: 24,
        marginHorizontal: 10,
        marginTop: 24,
    },
    btn: {
        width: "95%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
});

export default Doctor;

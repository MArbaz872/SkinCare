import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import firebase from 'firebase/compat';
import userAvatar from '../assests/images/oval.png'; // Adjust the path as needed
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../theme';


export default function Chat({ route, navigation }) {
    const { name, otherUserId, currentUserId } = route.params;


    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Initialize Firebase Firestore
        const db = firebase.firestore();

        // Create a chat room ID based on user IDs
        const chatRoomId = [currentUserId, otherUserId].sort().join('-');

        // Reference to the chat room in Firestore
        const chatRef = db.collection('chats').doc(chatRoomId);

        // Subscribe to changes in the chat messages
        const unsubscribe = chatRef
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const newMessages = snapshot.docs.map((doc) => {
                    const message = doc.data();
                    return {
                        _id: doc.id, // Use the document ID as a unique identifier
                        ...message,
                        createdAt: message.createdAt instanceof firebase.firestore.Timestamp
                            ? message.createdAt.toDate()
                            : new Date(),
                    };
                });

                setMessages(newMessages);

                setMessages(newMessages);
            });

        return () => {
            // Clean up the subscription when the component unmounts
            unsubscribe();
        };
    }, [currentUserId, otherUserId]);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{ marginBottom: 5 }} >
  
            <MaterialCommunityIcons name="send-circle" color={'#130C52'} size={30} />
                </View>
            </Send>
        )
    }

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name="angle-double-down" color={'#130C52'} size={30} />
        )
    }

    const onSend = async (newMessages = []) => {
        // Add new messages to Firestore
        const db = firebase.firestore();
        const chatRoomId = [currentUserId, otherUserId].sort().join('-');
        const chatRef = db.collection('chats').doc(chatRoomId);

        for (let i = 0; i < newMessages.length; i++) {
            const { text, user } = newMessages[i];
            const message = {
                text,
                user: {
                    _id: user._id,
                    avatar: userAvatar
                    //   name: user.name, // Uncomment this line if you want to include the sender's name
                },
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            };

            await chatRef.collection('messages').add(message);
        }
    };

    return (
        <View style={{ flex: 1 }}>
             <View style={styles.customHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={25} color="gray" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{name}</Text>
      <View style={{ width: 60 }}></View>
    </View>
            <GiftedChat
                messages={messages}
                onSend={(newMessages) => onSend(newMessages)}
                user={{
                    _id: currentUserId,
                    avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Finstagram&psig=AOvVaw30FYeGdNAVoXA4WDDcrFgP&ust=1694346285138000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCICqo_O5nYEDFQAAAAAdAAAAABAE',
                    // Add the name property here if needed

                }}
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}


                renderBubble={(props) => {
                    return (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                right: {
                                    backgroundColor: '#130C52',
                                },

                            }}
                        />
                    );
                }}
            />
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
});


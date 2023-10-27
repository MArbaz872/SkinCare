import PushNotification from "react-native-push-notification";
import firebase from "firebase/compat";


export const SendNotification1 = async (Appointment, docId) => {
    const user = firebase.auth().currentUser;

    try {
        const userSnapshot = await firebase.firestore()
            .collection('users')
            .where('user_id', '==', user.uid)
            .get();

        if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            const userName = userData.name;

            PushNotification.createChannel(
                {
                    channelId: "1",
                    channelName: "Sync Appointment",
                    channelDescription: "To remind Doc Appointment.",
                    soundName: "default",
                    vibrate: true,
                },
                (created) => console.log(`createChannel returned '${created}'`)
            );

            PushNotification.localNotification({
                channelId: "1",
                smallIcon: "ic_launcher_foreground",
                message: `Hello ${userName}, you have ${Appointment} Appointments.`,
            });
        } else {
            console.log("User data not found.");
        }
    } catch (error) {
        console.log("Error fetching user data:", error);
    }
}
export const SendNotification2 = async () => {
    const user = firebase.auth().currentUser;

    try {
        const userSnapshot = await firebase.firestore()
            .collection('users')
            .where('user_id', '==', user.uid)
            .get();

        if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            const userName = userData.name;

            PushNotification.createChannel(
                {
                    channelId: "2",
                    channelName: "Sync Appointment",
                    channelDescription: "To remind Doc Appointment.",
                    soundName: "default",
                    vibrate: true,
                },
                (created) => console.log(`createChannel returned '${created}'`)
            );

            PushNotification.localNotification({
                channelId: "2",
                smallIcon: "ic_launcher_foreground",
                message: `Welcome back, ${userName}, ! We're delighted to see you again!`,
            });
        } else {
            console.log("User data not found.");
        }
    } catch (error) {
        console.log("Error fetching user data:", error);
    }
}


export const SendNotification3 = async () => {
    const user = firebase.auth().currentUser;

    try {
        const userSnapshot = await firebase.firestore()
            .collection('users')
            .where('user_id', '==', user.uid)
            .get();

        if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            const userName = userData.name;

            PushNotification.createChannel(
                {
                    channelId: "3",
                    channelName: "Sync Appointment",
                    channelDescription: "To remind Doc Appointment.",
                    soundName: "default",
                    vibrate: true,
                },
                (created) => console.log(`createChannel returned '${created}'`)
            );

            PushNotification.localNotificationSchedule({
                channelId: "3",
                smallIcon: "ic_launcher_foreground",
                message: `Welcome back, ${userName}, ! We're delighted to see you again!`,
                date: new Date(Date.now() + 6000), // 10 seconds from now
                repeatTime: 1,
                id: 1,
            });
        } else {
            console.log("User data not found.");
        }
    } catch (error) {
        console.log("Error fetching user data:", error);
    }
}
export const SendNotification4 = async () => {
 
            PushNotification.createChannel(
                {
                    channelId: "4",
                    channelName: "Sync Appointment",
                    channelDescription: "To remind Doc Appointment.",
                    soundName: "default",
                    vibrate: true,
                },
                (created) => console.log(`createChannel returned '${created}'`)
            );

            PushNotification.localNotification({
                channelId: "4",
                smallIcon: "ic_launcher_foreground",
                message: `Appointment Book Successfully!`,
            });
       
}
export const SendNotification5 = async () => {
 
            PushNotification.createChannel(
                {
                    channelId: "5",
                    channelName: "Sync Appointment",
                    channelDescription: "To remind Doc Appointment.",
                    soundName: "default",
                    vibrate: true,
                },
                (created) => console.log(`createChannel returned '${created}'`)
            );

            PushNotification.localNotification({
                channelId: "5",
                smallIcon: "ic_launcher_foreground",
                message: `User has been blocked kindly contact to admin!`,
            });
       
}
export const SendNotification6 = async () => {
 
            PushNotification.createChannel(
                {
                    channelId: "6",
                    channelName: "blocked",
                    channelDescription: "To remind Doc Appointment.",
                    soundName: "default",
                    vibrate: true,
                },
                (created) => console.log(`createChannel returned '${created}'`)
            );

            PushNotification.localNotification({
                channelId: "6",
                smallIcon: "ic_launcher_foreground",
                message: `User blocked!`,
            });
       
}
export const SendNotification7 = async () => {
 
            PushNotification.createChannel(
                {
                    channelId: "7",
                    channelName: "UnBlock",
                    channelDescription: "To remind Doc Appointment.",
                    soundName: "default",
                    vibrate: true,
                },
                (created) => console.log(`createChannel returned '${created}'`)
            );

            PushNotification.localNotification({
                channelId: "7",
                smallIcon: "ic_launcher_foreground",
                message: `User UnBlock!`,
            });
       
}








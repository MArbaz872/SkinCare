/**
 * @create date 2023-08-25 9:15 PM
 */
// import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from '../config/FirebaseConfig';
import { FIREBASE_CONFIG } from '../config/FirebaseConfig';
import Login from '../login/login';
import Signup from '../login/signup';
import Patient from '../screen/Patient';
import VerifyEmail from '../screen/EmailVerification';
import { Loader } from '../components';
import MyDrawer from './Drawer';
import DoctorNavigation from '../doctor/DoctorNavigation';
import Doctor from '../doctor/Doctor';
import DocProfile from '../doctor/DocProFile';
import DoctorEditProfile from '../doctor/DocEditProfile';
// import Tabs from './Tabs';
// import DrawerContent from './DrawerContent';
import Home from '../screen/BottomTabs/Home';
import PatientProfile from '../screen/patient/PatientProfile';
import UpdatePatientProfile from '../screen/patient/UpdatePatientProfile';
import StatisticScreen from '../screen/patient/statisticAnalysisScreen';
import LearningResourcesStack from '../screen/patient/learningresources';
import SearchScreen from '../screen/patient/SearchScreen';
import BookAnAppointment from '../screen/patient/bookAppointment';

// ------------Chat----------------------
import Chat from '../chat/Chat';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [initializeApp, setinitializeApp] = useState(true)
    const [user, setUser] = useState('')

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializeApp) setinitializeApp(false)
    }

    useEffect(() => {
        const Data = firebase.auth().onAuthStateChanged(onAuthStateChanged)
        return Data
    }, [])

    if (initializeApp) return null;
    // if (!user) {
        return (
            <Stack.Navigator initialRouteName={'Splash'}>
                {/* <Stack.Screen name="Splash" component={Splash} options={options} /> */}
                <Stack.Screen name="Login" component={Login} options={options} />
                <Stack.Screen name="Signup" component={Signup} options={options} />
                <Stack.Screen name="Email Verification" component={VerifyEmail} options={options} />
                <Stack.Screen name="MyDrawer" component={MyDrawer} options={options} />
                <Stack.Screen name="DoctorNavigation" component={DoctorNavigation} options={options} />
                <Stack.Screen name="Doctor" component={Doctor} options={options} />
                <Stack.Screen name="DocProfile" component={DocProfile} options={options} />
                <Stack.Screen name="DoctorEditProfile" component={DoctorEditProfile} options={options} />
                {/* ------------------------Patient------------------------------------------- */}

                <Stack.Screen name="Home" component={Home} options={options} />
                <Stack.Screen name="PatientProfile" component={PatientProfile} options={options} />
                <Stack.Screen name="UpdatePatientProfile" component={UpdatePatientProfile} options={options} />
                <Stack.Screen name="StatisticScreen" component={StatisticScreen} options={options} />
                <Stack.Screen name="LearningResourcesStack" component={LearningResourcesStack} options={options} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} options={options} />
                <Stack.Screen name="BookAnAppointment" component={BookAnAppointment} options={options} />

                  {/* ------------------------Chat------------------------------------------- */}
                  <Stack.Screen name="Chat" component={Chat} options={options} />
            </Stack.Navigator>
        );
    // }
    // return (
    //     <Stack.Navigator>
    //         <Stack.Screen name="Dashbord" component={Dashbord} options={options} />
    //     </Stack.Navigator>
    // );

}
const options = () => ({
    headerShown: false,
    //  ...TransitionPresets.SlideFromRightIOS,
    //  transitionSpec: {
    //    open: TransitionSpecs.TransitionIOSSpec,
    //    close: TransitionSpecs.TransitionIOSSpec,
    //  },
});
export default RootNavigator;
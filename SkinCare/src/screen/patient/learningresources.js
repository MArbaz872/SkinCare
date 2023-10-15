import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Introduction from './learningResource/diseaseinfo/intro';
import History_One from './learningResource/diseaseinfo/history1';
import History_Two from './learningResource/diseaseinfo/history2';
import Acne from './learningResource/diseaseinfo/acne';
import Psoriasis from './learningResource/diseaseinfo/psoriasis';
import Nail_Fungus from './learningResource/diseaseinfo/nailfungus';
import Eczema from './learningResource/diseaseinfo/eczema';
import Tips from './learningResource/diseaseinfo/tips';

import ResourcesScreen from './learningResource/learningResourcesScreen';

function LearningResourcesStack(){
    const Stack = createNativeStackNavigator();
    return(
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Learning Resources" component={ResourcesScreen}/>
         <Stack.Screen name="Introduction" component={Introduction}/>
       <Stack.Screen name="History1" component={History_One}/>
        <Stack.Screen name="History2" component={History_Two}/>
        <Stack.Screen name="Acne" component={Acne}/>
        <Stack.Screen name="Eczema" component={Eczema}/>
        <Stack.Screen name="Psoriasis" component={Psoriasis}/>
        <Stack.Screen name="NailFungus" component={Nail_Fungus}/>
        <Stack.Screen name="Tips" component={Tips}/>
      </Stack.Navigator>
    );
  }

export default LearningResourcesStack;
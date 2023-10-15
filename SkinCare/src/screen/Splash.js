import React from "react";
import {
    SafeAreaView,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    Dimensions,
    useColorScheme,
    View,
    Animated,
  } from 'react-native';
  import * as Animatable from 'react-native-animatable';

const Splash = () => {
    return(
        <SafeAreaView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {startAnimation &&
          <Animatable.View
            duration={2800}
            style={{ height: 160 }}
            animation="flipInY">
            <Image
              style={{ height: 200, width: 200, resizeMode: 'contain', borderRadius: 20 }}
              source={Icons.applogo}></Image>
          </Animatable.View>
        }
      </View>

        </SafeAreaView>

    )
}

export default Splash;
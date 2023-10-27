import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/rootnavigation';
import { StripeProvider } from '@stripe/stripe-react-native';

const stripePublishableKey = 'pk_test_51NrRIyCdlGAtLq3UuuUvh5Evv2wvDPb1wsnWJmrcM35ySXmmHKfTvplrPVczGmU9vbBdU0MrSCzIgmiI71iDSoau006rQdMCj7'; // Replace with your actual publishable key


const App = () => {
  // publishableKey='pk_test_51NrRIyCdlGAtLq3UuuUvh5Evv2wvDPb1wsnWJmrcM35ySXmmHKfTvplrPVczGmU9vbBdU0MrSCzIgmiI71iDSoau006rQdMCj7'
  return (
  //   <StripeProvider
  //   publishableKey={publishableKey}
  //   merchantIdentifier="merchant.identifier" // required for Apple Pay
  //   urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
  // >
  //   <PaymentScreen />
  // </StripeProvider>
  <StripeProvider publishableKey={stripePublishableKey}>
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
</StripeProvider>
  
  );
};

export default App;


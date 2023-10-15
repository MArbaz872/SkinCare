import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const PaymentForm = () => {
  const { confirmPayment, stripe } = useStripe();
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = async () => {
    try {
      if (!stripe) {
        console.log('Stripe is not defined');
        return;
      }

      const { paymentMethod, error } = await confirmPayment({
        type: 'Card',
        billingDetails: {
          email: 'example@example.com',
        },
        card: {
          number: card,
          expMonth: expiry.split('/')[0],
          expYear: expiry.split('/')[1],
          cvc,
        },
      });

      if (error) {
        console.error('Payment Error:', error);
      } else {
        console.log('Payment Method:', paymentMethod);
      }
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Make Payment" onPress={handlePayment} />
    </View>
  );
};

export default PaymentForm;

import React, { useEffect } from 'react';
// import { useFonts } from 'expo-font';
import { PaperProvider } from 'react-native-paper';
import Main from './Main';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import store from './redux/store';
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {


  const stripeKey = "pk_test_51NvBUwSAu58rjExn3bowt8n7gjowd5F53KxuBzATHhWscmkVtF862IjDyBBWyIpXhSblRO3NofyWwqKMVoPs9CKq00LTs8PEG6"
  return (
    <StripeProvider
      threeDSecureParams={{
        backgroundColor: "#fff",
        timeout: 5,
      }}
      merchantIdentifier="portfolio.com"
      publishableKey={stripeKey}
    >
      <Provider store={store}>
        <PaperProvider>
          <Main />
        </PaperProvider>
      </Provider>
    </StripeProvider>

  );
}

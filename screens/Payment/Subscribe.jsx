import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { server } from "../../redux/store";
import { buySubscription, loadUser } from "../../redux/action/user";
import { useMessageAndErrorSubscription } from "../../utils/hooks";
import { useStripe } from "@stripe/stripe-react-native";
import Loader from "../Layout/Loader";

const Subscribe = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();

  const [key, setKey] = useState("");
  const [loaderLoading, setLoaderLoading] = useState(false);
  const [quantity, setQuantity] = useState("0");
  const [totalPrice, setTotalPrice] = useState(0);
  const { name, symbol, avgbuyingprice, exchange, code } = route.params;

  const { loading, subscriptionId } = useMessageAndErrorSubscription(
    navigation,
    dispatch,
    null
  );
  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);

    setKey(key);
    if (quantity == 0) {
      Toast.show({ type: "error", text1: "Quantity Can Not be 0" });
      return;
    }
    await dispatch(
      buySubscription(name, symbol, quantity, avgbuyingprice, exchange, code)
    );
  };

  const handleQuantityChange = (value) => {
    const newQuantity = value.replace(/[^0-9]/g, "");
    if (newQuantity === "") setQuantity("0");
    setQuantity(newQuantity);
    const totalPrice = (
      parseFloat(Number(newQuantity)) * avgbuyingprice
    ).toFixed(2);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (subscriptionId) {
        const init = await stripe.initPaymentSheet({
          paymentIntentClientSecret: subscriptionId,
          merchantDisplayName: "6PackEcom",
        });

        if (init.error) {
          Toast.show({ type: "error", text1: init.error.message });
          dispatch({
            type: "clearSubscriptionId",
          });
          console.log("Error in Subscribe.jsx1", init.error.message);

          return;
        }

        const presentSheet = await stripe.presentPaymentSheet();
        setLoaderLoading(true);

        if (presentSheet.error) {
          setLoaderLoading(false);
          Toast.show({ type: "error", text1: presentSheet.error.message });
          console.log("Error in Subscribe.jsx2", presentSheet.error.message);
          dispatch({
            type: "clearSubscriptionId",
          });
          return;
        }

        const { paymentIntent } = await stripe.retrievePaymentIntent(
          subscriptionId
        );

        if (paymentIntent.status === "Succeeded") {
          try {
            const response = await axios.post(`${server}/paymentverification`, {
              paymentIntentId: paymentIntent.id,
              subscriptionId: subscriptionId,
            });
            navigation.navigate("PaymentSuccess", {
              paymentid: paymentIntent.id,
            });
            await dispatch(loadUser());
          } catch (error) {
            console.log("Error in Subscribe.jsx3", error);
          }
        }
        setLoaderLoading(false);
      }
    };

    fetchData();
  }, [dispatch, key, subscriptionId]);

  useEffect(() => {
    setQuantity("0");
  }, []);

  return loaderLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.stockName}>{name}</Text>
          <Text style={styles.stockPrice}>₹{avgbuyingprice}</Text>
        </View>
        <Text style={styles.enterQuantity}>Enter Quantity</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="gray"
          placeholder="Quantity"
          value={quantity}
          onChangeText={handleQuantityChange}
        />
      </View>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceHeading}>Total Price:</Text>
        <Text style={styles.totalPriceValue}>₹{totalPrice}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.buyButton,
          { backgroundColor: loading ? "gray" : "green" },
        ]}
        onPress={subscribeHandler}
        disabled={loading}
      >
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // marginTop: 50,
    alignItems: "center",
    backgroundColor: "#121212",
  },
  card: {
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#1A1A1A",
  },
  row: {
    // flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  stockName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#DDD",
    marginBottom: 10,
  },
  stockPrice: {
    fontSize: 18,
    color: "#DDD",
  },
  enterQuantity: {
    marginTop: 30,
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
    color: "#DDD",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 16,
    width: "80%",
    alignSelf: "center",
    color: "#DDD",
    borderRadius: 10,
  },

  totalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    color: "#DDD",
  },
  totalPriceHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "#DDD",
  },
  totalPriceValue: {
    fontSize: 18,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  buyButton: {
    position: "absolute",
    bottom: 25,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "green",
    width: "80%",
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default Subscribe;

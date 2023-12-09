import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PaymentSuccess = ({ route, navigation }) => {
  const handleHomeNavigation = () => {
    // Navigate to Home screen
    navigation.navigate("Home"); // Replace "Home" with the actual route name for your home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Payment Successfully Processed</Text>
      <Text style={styles.paymentIdText}>
        Payment ID: {route.params.paymentid}
      </Text>

      {/* Home Button */}
      <TouchableOpacity
        onPress={handleHomeNavigation}
        style={styles.homeButton}
      >
        <Text style={styles.homeButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Background color
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green", // Success text color
  },
  paymentIdText: {
    fontSize: 14,
    color: "#fff", // Payment ID text color
  },
  homeButton: {
    marginTop: 20,
    // position: "absolute",
    // bottom: 50,
    padding: 10,
    backgroundColor: "green", // Button background color
    borderRadius: 5,
  },
  homeButtonText: {
    color: "white", // Button text color
    fontSize: 18,
  },
});

export default PaymentSuccess;

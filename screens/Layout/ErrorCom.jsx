import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ErrorCom = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>404 ERROR</Text>
      <Text style={styles.messageText}>Page not found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Background color for the error page
  },
  errorText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "red", // Color for the error text
  },
  messageText: {
    fontSize: 24,
    color: "black", // Color for the error message
  },
});

export default ErrorCom;

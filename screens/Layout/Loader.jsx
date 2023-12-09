import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator
        size="large"
        color="white" // Change the color as needed
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loader: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Loader;

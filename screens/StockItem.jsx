import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";

const StockItem = ({ name, price, changePercentage,onPress }) => {
  return (
        <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.changePercentage}>{changePercentage}</Text>
      </View>
    </View>
            <View style={styles.line}></View>
                </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 16,
    // paddingVertical: 8,
    paddingLeft:50,
    paddingRight:50,
    marginTop:5,
  },
  left: {
    flex: 1,
  },
  right: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  changePercentage: {
    fontSize: 14,
    color: "green", // You can style this based on positive or negative change
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    flex: 1,
  },
});

export default StockItem;

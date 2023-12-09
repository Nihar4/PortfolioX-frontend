import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StockItem from "./StockItem"; // Import the StockItem component

const TopGainers = ({ data, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Gainers</Text>
      {data.map((item, index) => (
        <StockItem
          key={index}
          symbol={item.symbol}
          name={item.name}
          changePercentage={item.regularMarketChangePercent}
          onPress={() => onPress(item.symbol, item.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e", // Dark background color
    paddingVertical: 12,
    marginBottom: 16,
    borderRadius: 8, // Add some border radius for a modern look
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 8,
    alignSelf: "center",
    color: "#fff", // White text color
  },
});

export default TopGainers;

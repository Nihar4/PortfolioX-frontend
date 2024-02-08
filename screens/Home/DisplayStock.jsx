import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import StockItem from "./StockItem"; // Import the StockItem component

const DisplayStock = ({ data, SeeMore, onPress, title, onPressSeeMore }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => onPressSeeMore(SeeMore)}>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      </View>
      {data.map((item, index) => (
        <StockItem
          key={index}
          symbol={item.company.searchId}
          name={item.company.companyName}
          price={item.stats.ltp}
          changePercentage={item.stats.dayChangePerc}
          logo={item.company.logoUrl || item.company.imageUrl}
          exchange={
            item.company.nseScriptCode &&
            item.company.nseScriptCode.trim() !== ""
              ? "NSE"
              : "BSE"
          }
          code={
            item.company.nseScriptCode &&
            item.company.nseScriptCode.trim() !== ""
              ? item.company.nseScriptCode
              : item.company.bseScriptCode
          }
          live={true}
          onPress={() => onPress(item.company.searchId)}
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
    marginHorizontal: 5,
    borderRadius: 8, // Add some border radius for a modern look
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // White text color
  },
  seeMore: {
    fontSize: 16,
    color: "#fff", // White text color
  },
});

export default DisplayStock;

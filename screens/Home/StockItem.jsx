import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios"; // Import Axios for making HTTP requests
import Loader from "../Layout/Loader";

const StockItem = ({ symbol, name, changePercentage, onPress }) => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=US&lang=en-US&includePrePost=false&interval=1d&range=5d&corsDomain=finance.yahoo.com&.tsrc=financed`;
        const response = await axios.get(url);
        const price = response.data.chart.result[0].meta.regularMarketPrice;
        setCurrentPrice(price.toFixed(2));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [symbol]);

  const roundedPercentage = parseFloat(changePercentage).toFixed(2);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TouchableOpacity onPress={() => onPress(symbol)}>
          <View style={styles.container}>
            <View style={styles.left}>
              {/* <Text style={styles.name}>
                {name.split(" ").length > 3
                  ? name.split(" ").slice(0, 3).join(" ")
                  : name}
              </Text> */}
              <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>₹{currentPrice || "N/A"}</Text>
              <Text
                style={[
                  styles.changePercentage,
                  parseFloat(changePercentage) < 0
                    ? styles.negativeChange
                    : styles.positiveChange,
                ]}
              >
                {roundedPercentage}%
              </Text>
            </View>
          </View>
          <View style={styles.line}></View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    backgroundColor: "#1e1e1e", // Dark background color
    borderRadius: 8,
  },
  left: {
    flex: 1,
    marginRight: 10,
  },
  right: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 18,

    color: "#fff", // White text color
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#fff", // White text color
    fontWeight: "bold",
  },
  changePercentage: {
    fontSize: 14,
    color: "#fff", // White text color
  },
  negativeChange: {
    color: "#ff6347", // Color for negative change
  },
  positiveChange: {
    color: "#32cd32", // Color for positive change
  },
  line: {
    height: 1,
    backgroundColor: "#333", // Darker line color
    flex: 1,
  },
});

export default StockItem;

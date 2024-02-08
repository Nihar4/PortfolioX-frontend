import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Loader from "../Layout/Loader";
import axios from "axios";

const StockItem = ({
  symbol,
  name,
  onPress,
  logo,
  exchange,
  code,
  price,
  changePercentage,
  live,
}) => {
  const [loading, setLoading] = useState(true);
  const [Lprice, setLPrice] = useState(price);

  const [LchangePercentage, setLChangePercentage] = useState(changePercentage);
  const [Lchange, setLChange] = useState(0);

  const roundedPercentage = parseFloat(LchangePercentage).toFixed(2);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://groww.in/v1/api/stocks_data/v1/tr_live_prices/exchange/${exchange}/segment/CASH/${code}/latest`
      );
      setLPrice(data.ltp);
      setLChangePercentage(data.dayChangePerc);
      setLChange(data.dayChange.toFixed(2));
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data: inside", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (live) {
      const intervalId = setInterval(fetchData, 3000);
      return () => clearInterval(intervalId);
    }
  }, [code, live]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TouchableOpacity onPress={() => onPress(symbol)}>
          <View style={styles.container}>
            <View style={styles.left}>
              {logo && <Image source={{ uri: logo }} style={styles.logo} />}
              <Text
                Text
                numberOfLines={3}
                ellipsizeMode="middle"
                style={styles.name}
              >
                {name}
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>₹{Lprice || "N/A"}</Text>
              <Text
                style={[
                  styles.changePercentage,
                  parseFloat(LchangePercentage) < 0
                    ? styles.negativeChange
                    : styles.positiveChange,
                ]}
              >
                {Lchange}({roundedPercentage}%)
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
    paddingBottom: 16,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    // borderWidth: 2, // Adjust border styling here
    // borderColor: "red", // Adjust border styling here
  },
  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 2, // Adjust border styling here
    // borderColor: "red", // Adjust border styling here
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    color: "#fff",
    width: 220,
    // borderWidth: 2, // Adjust border styling here
    // borderColor: "red", // Adjust border styling here
  },
  right: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
    color: "#fff",
  },
  changePercentage: {
    fontSize: 14,
    color: "#fff",
  },
  negativeChange: {
    color: "#ff6347",
  },
  positiveChange: {
    color: "#32cd32",
  },
  line: {
    height: 1,
    backgroundColor: "#333",
    flex: 1,
  },
});

export default StockItem;

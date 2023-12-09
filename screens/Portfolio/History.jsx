import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { defaultStyle } from "../../styles/style";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../redux/store";
import { Dimensions } from "react-native";
import Loader from "../Layout/Loader";

const renderBuyingHistory = (stocksData) => {
  const formatDate = (rawDate) => {
    const dateObject = new Date(rawDate);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1; // Months are 0-based, so add 1
    const year = dateObject.getUTCFullYear();
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const time = dateObject.toLocaleTimeString("en-US", timeOptions);
    return `${day}/${month}/${year} ${time}`;
  };

  return stocksData.quantityList.map((quantity, index) => (
    <View key={index} style={styles.historyItem}>
      <Text style={styles.historyItemText}>
        Date: {formatDate(stocksData.buyingDateList[index])}
      </Text>
      <Text style={styles.historyItemText}>
        Quantity: {stocksData.quantityList[index]}
      </Text>
      <Text style={styles.historyItemText}>
        {stocksData.status[index] === "Sell"
          ? `Selling Price: ₹${stocksData.buyingPriceList[index]}`
          : `Buying Price: ₹${stocksData.buyingPriceList[index]}`}
      </Text>
    </View>
  ));
};

const History = ({ route, navigation }) => {
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [stocksData, setStocksData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/getportfoliodata`)
      .then((response) => {
        const stockSymbol = route.params.symbol;
        const stock = response.data.logoData.find(
          (item) => item.symbol === stockSymbol
        );
        if (stock) {
          setStocksData(stock);
        } else {
          console.log("Stock not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(
          "Error in History.jsx",
          "Failed to fetch stock data",
          error
        );
        setLoading(false);
      });
  }, [user, route.params]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={styles.container}>
          <View style={defaultStyle}>
            <Text style={styles.stockName}>
              {stocksData.name.split(" ").slice(0, 3).join(" ")}
            </Text>
            <Text style={styles.stockSymbol}>
              {stocksData.symbol.endsWith(".NS") ||
              stocksData.symbol.endsWith(".BO")
                ? stocksData.symbol.slice(0, -3)
                : stocksData.symbol}
            </Text>

            <View style={styles.history}>
              <Text style={styles.sectionTitle}>History</Text>
              {renderBuyingHistory(stocksData)}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // paddingTop: 50,
  },
  stockName: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  stockSymbol: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: "white",
    margin: 20,
  },
  history: {
    marginTop: 30,
  },
  historyItem: {
    backgroundColor: "#292929",
    borderRadius: 8,
    margin: 10,
    padding: 15,
  },
  historyItemText: {
    fontSize: 16,
    color: "#DDD",
    marginTop: 5,
  },
});

export default History;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import axios from "axios";
import StockItem from "../Home/StockItem";
import { defaultStyle } from "../../styles/style";

const WatchList = ({ navigation }) => {
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const { loading } = useSelector((state) => state.profile);
  const [stocksData, setStocksData] = useState();
  const watchlist = user.watchlist;

  useEffect(() => {
    const fetchWatchlistData = async () => {
      try {
        const updatedWatchlist = await Promise.all(
          watchlist.map(async (stock) => {
            const response = await axios.get(
              `https://groww.in/v1/api/stocks_data/v1/tr_live_prices/exchange/${stock.exchange}/segment/CASH/${stock.code}/latest`
            );
            const price = (response.data.ltp + Math.random() * 10 - 5).toFixed(
              2
            );
            const change = (
              response.data.dayChange +
              Math.random() * 10 -
              5
            ).toFixed(2);
            const changeperc = (
              response.data.dayChangePerc +
              Math.random() * 10 -
              5
            ).toFixed(2);
            return {
              ...stock,
              price: price,
              change: change,
              changeperc: changeperc,
            };
          })
        );
        setStocksData(updatedWatchlist);
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
      }
    };
    fetchWatchlistData();
    // const intervalId = setInterval(fetchWatchlistData, 1000);
    // return () => clearInterval(intervalId);
  }, [watchlist]);

  const handleStockClick = (symbol) => {
    navigation.navigate("StockDetail", {
      id: symbol,
    });
  };

  return loading || !stocksData ? (
    <Loader />
  ) : (
    <ScrollView style={defaultStyle}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WatchList</Text>
        </View>
        {stocksData.map((item, index) => (
          <StockItem
            key={index}
            symbol={item.symbol}
            name={item.name}
            price={item.price}
            changePercentage={item.changeperc}
            logo={item.logo}
            exchange={item.exchange}
            code={item.code}
            live={true}
            onPress={() => handleStockClick(item.symbol)}
          />
        ))}
      </View>
    </ScrollView>
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
    justifyContent: "center",
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

export default WatchList;

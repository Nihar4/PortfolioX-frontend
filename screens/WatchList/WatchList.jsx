import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GetWatchlist } from "../../redux/action/user";
import Loader from "../Layout/Loader";

const WatchList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const { loading, watchlist } = useSelector((state) => state.profile);
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    const loaddata = async () => {
      if (isAuthenticated) await dispatch(GetWatchlist());
    };
    loaddata();
  }, [user]);

  useEffect(() => {
    if (watchlist !== undefined) {
      const roundedStocksData = watchlist.map((stock) => ({
        ...stock,
        CurrentPrice: stock.CurrentPrice.toFixed(2),
        regularMarketChangeRS: stock.regularMarketChangeRS.toFixed(2),
        regularMarketChangePercent: stock.regularMarketChangePercent.toFixed(2),
      }));
      setStocksData(roundedStocksData);
    }
  }, [watchlist]);

  const handleStockClick = (stock) => {
    navigation.navigate("StockDetail", { symbol: stock.symbol, id: stock.id });
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.watchlistHeading}>WatchList</Text>

        {stocksData.length > 0 ? (
          stocksData.map((stock, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleStockClick(stock)}
            >
              <View style={styles.row}>
                <View style={[styles.column, styles.nameColumn]}>
                  <Text style={styles.stockName}>{stock.name}</Text>
                  <Text style={styles.symbol}>{stock.symbol}</Text>
                </View>
                <View style={[styles.column, styles.priceColumn]}>
                  <Text style={[styles.stockPrice, styles.rightAligned]}>
                    ₹{stock.CurrentPrice}
                  </Text>
                  <Text
                    style={[
                      styles.stockChange,
                      styles.rightAligned,
                      stock.regularMarketChangeRS >= 0
                        ? styles.greenText
                        : styles.redText,
                    ]}
                  >
                    {stock.regularMarketChangeRS > 0 ? "+" : ""}
                    {stock.regularMarketChangeRS} (
                    {Math.abs(stock.regularMarketChangePercent)}%)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noWatchlistText}>No watchlist available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  watchlistHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#444",
    // marginTop: 20,
  },
  row: {
    flexDirection: "row",
  },
  stockName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  stockPrice: {
    fontSize: 16,
    color: "white",
  },
  stockChange: {
    fontSize: 14,
    color: "white",
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },
  nameColumn: {
    flex: 2,
  },
  priceColumn: {
    flex: 1,
  },
  rightAligned: {
    textAlign: "right",
    color: "#DDD",
  },
  redText: {
    color: "#FF5733",
  },
  greenText: {
    color: "#4CAF50",
  },
  symbol: {
    fontSize: 14,
    color: "#BBB",
  },
  noWatchlistText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default WatchList;

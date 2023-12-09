import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { defaultStyle } from "../../styles/style";
import PopularStocks from "./PopularStocks";
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";
import axios from "axios";
import { Text } from "react-native-paper";
import Loader from "../Layout/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "../../redux/store";

const Home = ({ navigation }) => {
  const [topGainersData, setTopGainersData] = useState([]);
  const [topLosersData, setTopLosersData] = useState([]);
  const [popularstocks, setPopularStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStockItemClick = (symbol, id) => {
    navigation.navigate("StockDetail", { symbol: symbol, id: id });
  };

  useEffect(() => {
    const loaddata = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/getall`, {
          withCredentials: true,
        });
        setPopularStocks(data.popular);
        setTopLosersData(data.loser);
        setTopGainersData(data.gainer);
        setLoading(false);
      } catch (error) {
        console.log("error in home.jsx", error);
        setLoading(false);
      }
    };
    loaddata();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={styles.container}>
          <View style={defaultStyle}>
            <PopularStocks
              data={popularstocks}
              onPress={handleStockItemClick}
            />
            <TopGainers data={topGainersData} onPress={handleStockItemClick} />
            <TopLosers data={topLosersData} onPress={handleStockItemClick} />
          </View>
        </ScrollView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});

export default Home;

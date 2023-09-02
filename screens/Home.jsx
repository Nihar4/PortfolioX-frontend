import { View, Text } from "react-native";
import React from "react";
import { defaultStyle } from "../styles/style";

const Home = () => {
  // current price , day change in rs , day change in percentage
  const MyWatchlist = [];
  const PopularStocks = [];
  const TopGainer = ["manappuram Fin", "MCX"];
  const TopLosser = [];

  return (
    <View style={defaultStyle}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

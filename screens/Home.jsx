// import { View, Text } from "react-native";
// import React from "react";
// import { defaultStyle } from "../styles/style";

// const Home = () => {
//   // current price , day change in rs , day change in percentage
//   const MyWatchlist = [];
//   const PopularStocks = [];
//   const TopGainer = ["manappuram Fin", "MCX"];
//   const TopLosser = [];

//   return (
//     <View style={defaultStyle}>
//       <Text>Home</Text>
//     </View>
//   );
// };

// export default Home;
// import React from "react";
// import { View, ScrollView, StyleSheet } from "react-native";
// import { defaultStyle } from "../styles/style";
// import PopularStocks from "./PopularStocks";
// import TopGainers from "./TopGainers";
// import TopLosers from "./TopLosers";

// const Home = () => {
//   // Sample data for each section with name and price
//   const popularStocksData = [
//     { name: "Stock1", price: "₹100.50" },
//     { name: "Stock2", price: "₹75.25" },
//     { name: "Stock3", price: "₹120.75" },
//     { name: "Stock4", price: "₹90.30" },
//     { name: "Stock5", price: "₹105.60" },
//   ];

//   const topGainersData = [
//     { name: "Gainer1", price: "₹150.25" },
//     { name: "Gainer2", price: "₹130.10" },
//     { name: "Gainer3", price: "₹180.90" },
//     { name: "Gainer4", price: "₹160.45" },
//     { name: "Gainer5", price: "₹145.75" },
//   ];

//   const topLosersData = [
//     { name: "Loser1", price: "₹45.75" },
//     { name: "Loser2", price: "₹60.30" },
//     { name: "Loser3", price: "₹35.90" },
//     { name: "Loser4", price: "₹55.15" },
//     { name: "Loser5", price: "₹42.80" },
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       <View style={defaultStyle}>
//         <PopularStocks data={popularStocksData} />
//         <TopGainers data={topGainersData} />
//         <TopLosers data={topLosersData} />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000000",
//   },
// });

// export default Home;

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { defaultStyle } from "../styles/style";
import PopularStocks from "./PopularStocks";
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";

const Home = () => {
  // Sample data for each section with name, price, and change percentage
  const popularStocksData = [
    { name: "Stock1", price: "₹100.50", changePercentage: "+2.5%" },
    { name: "Stock2", price: "₹75.25", changePercentage: "-1.2%" },
    { name: "Stock3", price: "₹120.75", changePercentage: "+0.8%" },
    { name: "Stock4", price: "₹90.30", changePercentage: "-3.0%" },
    { name: "Stock5", price: "₹105.60", changePercentage: "+1.4%" },
  ];

  const topGainersData = [
    { name: "Gainer1", price: "₹150.25", changePercentage: "+4.2%" },
    { name: "Gainer2", price: "₹130.10", changePercentage: "+2.1%" },
    { name: "Gainer3", price: "₹180.90", changePercentage: "+5.5%" },
    { name: "Gainer4", price: "₹160.45", changePercentage: "+3.3%" },
    { name: "Gainer5", price: "₹145.75", changePercentage: "+1.8%" },
  ];

  const topLosersData = [
    { name: "Loser1", price: "₹45.75", changePercentage: "-2.7%" },
    { name: "Loser2", price: "₹60.30", changePercentage: "-1.1%" },
    { name: "Loser3", price: "₹35.90", changePercentage: "-4.6%" },
    { name: "Loser4", price: "₹55.15", changePercentage: "-2.0%" },
    { name: "Loser5", price: "₹42.80", changePercentage: "-3.9%" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={defaultStyle}>
        <PopularStocks 
        data={popularStocksData}
        onPress={(data) => {
          console.log("Clicked on popular stock:", data.name);
        }} 
        />
        <TopGainers 
        data={topGainersData} 
        onPress={(item) => {
          console.log("Clicked on popular stock:", item.name);
        }}
        />
        <TopLosers 
        data={topLosersData} 
        onPress={(item) => {
          console.log("Clicked on popular stock:", item.name);
        }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});

export default Home;

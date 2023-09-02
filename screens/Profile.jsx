import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { colors, defaultStyle } from "../styles/style";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  // const ApiKey = "df1f02c5b68b452287a9368403f4ab77";
  // const PROXY_URL = "http://localhost:5000";
  const [symbols, setSymbols] = useState([]);
  const [logoUrls, setLogoUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.twelvedata.com/stocks?mic_code=XNSE&source=docs"
        );
        const data = response.data.data;

        // Shuffle the array randomly
        // console.log(data);
        const shuffledData = data.sort(() => 0.5 - Math.random());

        // Get the first 200 items from the shuffled array
        const randomSymbols = shuffledData
          .slice(0, 2406)
          .map((item) => item.symbol);

        setSymbols(randomSymbols);
        console.log(randomSymbols);
        fetchLogos(randomSymbols);
        // console.log(symbols, logoUrls);
      } catch (error) {
        // console.error("1Error fetching data:", error);
        return null;
      }
    };

    const fetchLogos = async (symbolArray) => {
      try {
        let index = 1;
        const logoData = await Promise.all(
          symbolArray.map(async (symbol) => {
            index = index + 1;
            const s = symbol + ".NS";
            const url = `https://query1.finance.yahoo.com/v7/finance/options/${s}?modules=financialData`;
            // const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=US&lang=en-US&includePrePost=false&interval=1d&range=5d&corsDomain=finance.yahoo.com&.tsrc=finance`;
            try {
              const response = await axios.get(url);
              // console
              // .log
              // response.data.optionChain.result[0].quote.regularMarketPrice
              // ();
              const price =
                response.data.optionChain.result[0].quote.regularMarketPrice;
              // const data = response.data.chart.result[0].meta.regularMarketPrice;

              return {
                symbol: symbol,
                price: price === undefined ? null : price,
              };
            } catch (error) {
              // console.log("2Error fetching data:", error, s, index);
              return null;
            }
          })
        );

        // Filter out any null values in case of errors
        const filteredLogoData1 = logoData.filter((item) => item !== null);
        const filteredLogoData = filteredLogoData1.filter(
          (item) => item.price !== null
        );
        setLogoUrls(filteredLogoData);
      } catch (error) {
        // console.log("3Error fetching data:", error);
        return null;
      }
    };

    fetchData();
    // fetchLogos(symbols);
  }, []);

  return (
    <View style={[defaultStyle, styles.container]}>
      <SafeAreaView>
        <ScrollView>
          <Text style={{ color: colors.text }}>Stock Symbols and Logos:</Text>
          {logoUrls.map((symbol, index) => (
            <View key={index} style={{ flexDirection: "row" }}>
              <Text style={{ color: colors.text }}>
                {logoUrls[index].symbol}{" "}
              </Text>
              <Text style={{ color: colors.text }}>
                {" "}
                {logoUrls[index].price}
              </Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    color: colors.text,
  },
});

export default Profile;

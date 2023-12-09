import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FlatList } from "react-native-gesture-handler";

const Search = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [searchdata, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  const screenHeight = Dimensions.get("window").height;

  const handleInputChange = (text) => {
    setInputValue(text);
  };
  const renderItem = ({ item }) => {
    // const symbolWithoutPostfix = item.symbol
    //   .replace(".NS", "")
    //   .replace(".BO", "");

    // const exchange = item.symbol.endsWith(".NS") ? "NSE" : "BSE";

    const handleStockItemClick = () => {
      navigation.navigate("StockDetail", {
        symbol: item.symbol,
        id: item.id,
      });
    };

    return (
      <TouchableOpacity onPress={handleStockItemClick}>
        <View style={styles.stockItem}>
          <View>
            <Text style={styles.stockName}>{item.name}</Text>
            {/* <Text style={styles.stockSymbol}>{symbolWithoutPostfix}</Text> */}
          </View>
          {/* <View>
            <Text style={styles.exchange}>{exchange}</Text>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setSearchData([]);
    const loaddata = async () => {
      try {
        setLoading(true);
        const url = `https://groww.in/v1/api/search/v1/entity?app=false&page=0&q=${inputValue}&size=100`;
        const { data } = await axios.get(url);
        // console.log(data.content);
        let alldata = [];
        const symbolsWithoutPeriod = data.content.filter(
          (symbol) =>
            symbol.entity_type === "Stocks" &&
            !symbol.nse_scrip_code.includes(".")
        );

        symbolsWithoutPeriod.forEach((item) => {
          // if (item.exchange === "NSE") {
          alldata.push({
            symbol: item.nse_scrip_code + ".NS",
            name: item.title,
            id: item.search_id,
          });
          // } else if (item.exchange === "BSE") {
          // alldata.push({ symbol: item.symbol + ".BO", name: "" });
          // }
        });

        // const updatedAlldata = await Promise.all(
        //   alldata.map(async (item) => {
        //     try {
        //       const s = item.symbol;
        //       const url = `https://query1.finance.yahoo.com/v7/finance/options/${s}?modules=financialData`;
        //       const response1 = await axios.get(url);
        //       const name = response1.data.optionChain.result[0].quote.longName;
        //       if (name === null || name === undefined) return null;
        //       item.name = name;
        //       return item;
        //     } catch (error) {
        //       return null;
        //     }
        //   })
        // );

        const filteredAlldata = alldata.filter((item) => item !== null);
        setSearchData(filteredAlldata);
        setLoading(false);
      } catch (error) {
        console.log("error in serch.jsx", error);
        setLoading(false);
      }
    };
    loaddata();
  }, [inputValue]);

  return (
    <View style={[styles.container, { minHeight: screenHeight + 40 }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="ios-arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={inputValue}
          onChangeText={handleInputChange}
        />
      </View>
      <FlatList
        data={searchdata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.container1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 0,
    backgroundColor: "#000",
  },
  container1: {
    flex: 1,
    backgroundColor: "#000",
    marginTop: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#333",
    borderRadius: 8,
    color: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
  },
  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  stockName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  stockSymbol: {
    fontSize: 12,
    color: "#888",
  },
  exchange: {
    fontSize: 12,
    color: "#888",
  },
  equityName: {
    fontSize: 12,
    color: "#888",
  },
});

export default Search;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import StockItem from "./StockItem";
import { defaultStyle } from "../../styles/style";
import Loader from "../Layout/Loader";

const DisplayMore = ({ route, navigation }) => {
  const { data } = route.params;
  const [selectedKey, setSelectedKey] = useState(Object.keys(data)[0]);
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [height, setHeight] = useState(0);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  const handleStockItemClick = (id) => {
    navigation.navigate("StockDetail", { id: id });
  };

  const renderItem = ({ item }) => {
    const startIndex = Math.max(parseInt(current / 66) - 5, 0);
    const endIndex = startIndex + 15;
    const isVisible =
      data[selectedKey].indexOf(item) >= startIndex &&
      data[selectedKey].indexOf(item) <= endIndex;

    return (
      <StockItem
        symbol={item.company.searchId}
        name={item.company.companyName}
        price={item.stats.ltp}
        changePercentage={item.stats.dayChangePerc}
        logo={item.company.logoUrl || item.company.imageUrl}
        exchange={
          item.company.nseScriptCode && item.company.nseScriptCode.trim() !== ""
            ? "NSE"
            : "BSE"
        }
        code={
          item.company.nseScriptCode && item.company.nseScriptCode.trim() !== ""
            ? item.company.nseScriptCode
            : item.company.bseScriptCode
        }
        live={isVisible}
        onPress={() => handleStockItemClick(item.company.searchId)}
      />
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={[styles.container, defaultStyle]}>
          <View style={styles.buttonContainer}>
            {Object.keys(data).map((key) => (
              <TouchableOpacity key={key} onPress={() => setSelectedKey(key)}>
                <View
                  style={[
                    styles.button,
                    key === selectedKey && styles.selectedButton,
                  ]}
                >
                  <Text style={styles.buttonText}>{key}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {data[selectedKey].length > 0 && (
            <FlatList
              data={data[selectedKey]}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              onScroll={({ nativeEvent }) => {
                setHeight(nativeEvent.layoutMeasurement.height);
                setCurrent(nativeEvent.contentOffset.y);
                setTotal(nativeEvent.contentSize.height);
              }}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: "#333",
    minWidth: 100,
    height: 40,
  },
  selectedButton: {
    backgroundColor: "#555",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default DisplayMore;

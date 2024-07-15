import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { defaultStyle } from "../../styles/style";
import axios from "axios";
import DisplayStock from "./DisplayStock";
import Loader from "../Layout/Loader";

const Home = ({ navigation }) => {
  const [gainerLarge, setGainerLarge] = useState([]);
  const [gainerMid, setGainerMid] = useState([]);
  const [gainerSmall, setGainerSmall] = useState([]);
  const [loserLarge, setLoserLarge] = useState([]);
  const [loserMid, setLoserMid] = useState([]);
  const [loserSmall, setLoserSmall] = useState([]);
  const [stockInNews, setStockInNews] = useState([]);
  const [mostValuable, setMostValuable] = useState([]);
  const [popularstocks, setPopularStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStockItemClick = (id) => {
    navigation.navigate("StockDetail", { id: id });
  };

  const onPressSeeMore = (data) => {
    navigation.navigate("DisplayMore", { data: data });
  };

  const fetchData = async () => {
    try {
      const popularResponse = await axios.get(
        "https://groww.in/v1/api/stocks_data/v2/explore/list/top?discoveryFilterTypes=STOCKS_IN_NEWS%2CMOST_VALUABLE%2CPOPULAR_STOCKS_MOST_BOUGHT&page=0&size=30"
      );
      const gainerLargeResponse = await axios.get(
        "https://groww.in/v1/api/stocks_data/explore/v2/indices/GIDXNIFTY100/market_trends?discovery_filter_types=TOP_GAINERS&size=100"
      );
      const gainerMidResponse = await axios.get(
        "https://groww.in/v1/api/stocks_data/explore/v2/indices/GIDXNIFMDCP100/market_trends?discovery_filter_types=TOP_GAINERS&size=100"
      );
      const gainerSmallResponse = await axios.get(
        "https://groww.in/v1/api/stocks_data/explore/v2/indices/GIDXNIFSMCP100/market_trends?discovery_filter_types=TOP_GAINERS&size=100"
      );
      const loserLargeResponse = await axios.get(
        "https://groww.in/v1/api/stocks_data/explore/v2/indices/GIDXNIFTY100/market_trends?discovery_filter_types=TOP_LOSERS&size=100"
      );
      const loserMidResponse = await axios.get(
        "https://groww.in/v1/api/stocks_data/explore/v2/indices/GIDXNIFMDCP100/market_trends?discovery_filter_types=TOP_LOSERS&size=100"
      );
      const loserSmallResponse = await axios.get(
        "https://groww.in/v1/api/stocks_data/explore/v2/indices/GIDXNIFSMCP100/market_trends?discovery_filter_types=TOP_LOSERS&size=100"
      );

      setStockInNews(popularResponse.data.exploreCompanies.STOCKS_IN_NEWS);
      setMostValuable(popularResponse.data.exploreCompanies.MOST_VALUABLE);
      setPopularStocks(
        popularResponse.data.exploreCompanies.POPULAR_STOCKS_MOST_BOUGHT
      );

      setGainerLarge(
        gainerLargeResponse.data.categoryResponseMap.TOP_GAINERS.items
      );
      setGainerMid(
        gainerMidResponse.data.categoryResponseMap.TOP_GAINERS.items
      );
      setGainerSmall(
        gainerSmallResponse.data.categoryResponseMap.TOP_GAINERS.items
      );
      setLoserLarge(
        loserLargeResponse.data.categoryResponseMap.TOP_LOSERS.items
      );
      setLoserMid(loserMidResponse.data.categoryResponseMap.TOP_LOSERS.items);
      setLoserSmall(
        loserSmallResponse.data.categoryResponseMap.TOP_LOSERS.items
      );

      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 5 * 60 * 1000); // Fetch data every 5 seconds

    fetchData(); // Fetch data immediately on component mount

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Render loading only on initial load
  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView style={defaultStyle}>
      <View style={styles.container}>
        <Text>Updated</Text>
        <DisplayStock
          data={stockInNews.slice(0, 5)}
          title={"Popular Stocks"}
          onPress={handleStockItemClick}
          SeeMore={{
            InNews: stockInNews,
            PopularStocks: popularstocks,
            MostValuable: mostValuable,
          }}
          onPressSeeMore={onPressSeeMore}
        />
        <DisplayStock
          data={gainerLarge.slice(0, 5)}
          title={"Top Gainer"}
          onPress={handleStockItemClick}
          SeeMore={{
            Large: gainerLarge,
            Mid: gainerMid,
            Small: gainerSmall,
          }}
          onPressSeeMore={onPressSeeMore}
        />
        <DisplayStock
          data={loserLarge.slice(0, 5)}
          title={"Top Looser"}
          onPress={handleStockItemClick}
          SeeMore={{
            Large: loserLarge,
            Mid: loserMid,
            Small: loserSmall,
          }}
          onPressSeeMore={onPressSeeMore}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;

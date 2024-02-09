import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";
import Loader from "../Layout/Loader";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useMessageAndErrorProfile } from "../../utils/hooks";
import { addToPlaylist, removeFromPlaylist } from "../../redux/action/profile";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/action/user";
import ErrorCom from "../Layout/ErrorCom";
import Chart2 from "./Chart2";

const StockPage = ({ route, navigation }) => {
  const [latest, setLatest] = useState(null);
  const [chart, setChart] = useState(null);
  const [gdata, setGdata] = useState(null);
  const [news, setNews] = useState(null);

  const [progress, setProgress] = useState(0);
  const [sellBtn, SetsellBtn] = useState(false);

  const [activeTab, setActiveTab] = useState("Overview");

  const [loading, setLoading] = useState(true);
  const [rangeloading, setrangeLoading] = useState(false);

  const [Error, setError] = useState(false);
  const [range, setRange] = useState("1d");
  const [exchange, setExchange] = useState(null);
  const [code, setCode] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [changeValue, setchangeValue] = useState(0);
  const [changePerc, setchangePerc] = useState(0);
  const rangeRef = useRef(range);
  // console.log(range, changePerc, changeValue);
  const { id } = route.params;
  useEffect(() => {
    rangeRef.current = range;
  }, [range]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const dispatch = useDispatch();

  const loading1 = useMessageAndErrorProfile(navigation, dispatch, null);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const fetchCoin = useCallback(
    async (exchange, code) => {
      try {
        const response = await axios.get(
          `https://groww.in/v1/api/stocks_data/v1/tr_live_prices/exchange/${exchange}/segment/CASH/${code}/latest`
        );
        setLatest(response.data);
        const progress =
          (response.data.ltp - response.data.low) /
          (response.data.high - response.data.low);
        setProgress(progress);
        setError(false);
        // console.log("here", chart[rangeRef.current]);
        if (rangeRef.current === "1d") {
          setchangeValue(response.data.dayChange);
          setchangePerc(response.data.dayChangePerc);
        }
      } catch (error) {
        console.log("error in stockDetail.jsx ", error);
        setLoading(false);
        setError(true);
      }
    },
    [rangeRef.current]
  );
  // console.log(rangeRef.current);
  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchNewsAndGdata = async () => {
      try {
        const response2 = await axios.get(
          `https://groww.in/v1/api/stocks_data/v1/company/search_id/${id}`
        );
        const companyId = response2.data.header.growwCompanyId;
        const isNseTradable = response2.data.header.isNseTradable;
        const nseScriptCode = response2.data.header.nseScriptCode;
        const bseScriptCode = response2.data.header.bseScriptCode;

        const postfixMap = {
          "1d": "daily?intervalInMinutes=5&minimal=true",
          "1w": "weekly?intervalInMinutes=15&minimal=true",
          "1m": "monthly?intervalInMinutes=30&minimal=true",
          "1y": "1y?intervalInDays=1&minimal=true",
          "5y": "5y?intervalInDays=5&minimal=true",
          all: "all?minimal=true&noOfCandles",
        };

        const chartData = {};
        for (const range in postfixMap) {
          const postfix = postfixMap[range];
          const chartResponse = await axios.get(
            `https://groww.in/v1/api/charting_service/v2/chart/exchange/${
              isNseTradable ? "NSE" : "BSE"
            }/segment/CASH/${
              isNseTradable ? nseScriptCode : bseScriptCode
            }/${postfix}`
          );
          chartData[range] = chartResponse.data;
        }

        const newsResponse = await axios.get(
          `https://groww.in/v1/api/stocks_company_master/v1/company_news/groww_contract_id/${companyId}?page=0&size=100`
        );

        setChart(chartData);
        setNews(newsResponse.data);
        setGdata(response2.data);
        setExchange(isNseTradable ? "NSE" : "BSE");
        setCode(isNseTradable ? nseScriptCode : bseScriptCode);

        await fetchCoin(
          isNseTradable ? "NSE" : "BSE",
          isNseTradable ? nseScriptCode : bseScriptCode
        );

        setLoading(false);
      } catch (error) {
        console.log("error fetching news and gdata: ", error);
      }
    };

    fetchNewsAndGdata();
    if (exchange && code) {
      const intervalId = setInterval(() => {
        fetchCoin(exchange, code);
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [route.params, route, exchange, code]);
  useEffect(() => {
    SetsellBtn(false);
    setIsBookmarked(false);

    if (isAuthenticated && user) {
      const sellBtn = user.portfolio.some((item) => item.symbol === id);
      if (sellBtn) SetsellBtn(true);
      user.watchlist.map((item, index) => {
        if (item.symbol === id) {
          setIsBookmarked(true);
          return;
        }
      });
    }
  }, [route.params, user, isAuthenticated]);
  useEffect(() => {
    setrangeLoading(true);
    if (range != "1d") {
      setchangePerc(chart[range].changePerc * 100);
      setchangeValue(chart[range].changeValue);
    } else {
      if (latest) {
        setchangePerc(latest.dayChangePerc);
        setchangeValue(latest.dayChange);
      }
    }
    const timeoutId = setTimeout(() => {
      setrangeLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [range]);
  const toggleBookmark = async () => {
    if (isAuthenticated) setIsBookmarked(!isBookmarked);

    if (isBookmarked) {
      await dispatch(
        removeFromPlaylist(
          gdata.header.displayName,
          gdata.header.searchId,
          exchange,
          code
        )
      );
      await dispatch(loadUser());
    } else {
      await dispatch(
        addToPlaylist(
          gdata.header.displayName,
          gdata.header.searchId,
          exchange,
          code,
          gdata.header.logoUrl
        )
      );
      await dispatch(loadUser());
    }
  };

  const handleBuy = () => {
    if (!isAuthenticated) {
      Toast.show({
        type: "error",
        text1: "Not Login",
      });
    } else {
      navigation.navigate("Subscribe", {
        name: gdata.header.displayName,
        symbol: gdata.header.searchId,
        avgbuyingprice: latest.ltp,
        exchange: exchange,
        code: code,
      });
    }
  };

  const handleSell = () => {
    if (!isAuthenticated) {
      Toast.show({
        type: "error",
        text1: "Not Login",
      });
    } else {
      if (sellBtn) {
        navigation.navigate("Sell", {
          name: gdata.header.displayName,
          symbol: gdata.header.searchId,
          avgbuyingprice: latest.ltp,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "You haven't bought this stock, so you can't sell it. ",
        });
      }
    }
  };

  const fnews = () => {
    const handleNewsClick = (url) => {
      Linking.openURL(url);
    };

    return (
      <ScrollView style={styles.newscontainer}>
        {!news.results ? (
          <Text style={styles.performanceTitle}>No News Found</Text>
        ) : (
          news.results.map((newsItem, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleNewsClick(newsItem.url)}
            >
              <View style={styles.newsItem}>
                <Text style={styles.source}>{newsItem.source}</Text>
                <Text style={styles.title}>{newsItem.title}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    );
  };
  const overview = () => {
    return (
      <>
        <View style={styles.performanceSection}>
          <Text style={styles.performanceTitle}>Performance</Text>
          {renderPerformance(
            "Today's Low",
            "Today's High",
            latest.low,
            latest.high
          )}

          <View style={styles.progressBarContainer}>
            <ProgressBar progress={progress} color={"green"} />
          </View>

          {renderPerformance(
            "52 Week Low",
            "52 Week High",
            Math.min(
              gdata.priceData[exchange.toLowerCase()].yearLowPrice,
              latest.low
            ),
            Math.max(
              gdata.priceData[exchange.toLowerCase()].yearHighPrice,
              latest.high
            )
          )}

          <View style={styles.progressBarContainer}>
            <ProgressBar
              progress={
                (latest.ltp -
                  gdata.priceData[exchange.toLowerCase()].yearLowPrice) /
                (gdata.priceData[exchange.toLowerCase()].yearHighPrice -
                  gdata.priceData[exchange.toLowerCase()].yearLowPrice)
              }
              color="green"
            />
          </View>

          {renderPerformance("Open", "Prev. Close", latest.open, latest.close)}
          {renderFinancialData("Volume", latest.volume)}
        </View>

        <View style={styles.performanceSection}>
          <Text style={styles.performanceTitle}>Financial Data</Text>
          {renderFinancialData("MarketCap", gdata.stats.marketCap)}
          {renderFinancialData("P/E Ratio(TTM)", gdata.stats.peRatio)}
          {renderFinancialData("industryPE", gdata.stats.industryPe)}
          {renderFinancialData("pbRatio", gdata.stats.pbRatio)}
          {renderFinancialData("debtToEquity", gdata.stats.debtToEquity)}
          {renderFinancialData("ROE", gdata.stats.roe)}
          {renderFinancialData("trailingEps", gdata.stats.epsTtm)}
          {renderFinancialData("dividendYield", gdata.stats.divYield)}
          {renderFinancialData("bookValue", gdata.stats.bookValue)}
        </View>

        <View style={styles.performanceSection}>
          <Text style={styles.performanceTitle}>About Company</Text>
          <View style={[styles.outer1, styles.about]}>
            <Text style={[styles.performanceValue, styles.text]}>
              {gdata.details.businessSummary || "N/A"}
            </Text>
          </View>
          {renderFinancialData("Industry", gdata.header.industryName)}
          {renderFinancialData("foundedYear", gdata.details.foundedYear)}
          {renderFinancialData("Website", gdata.details.websiteUrl)}
        </View>
      </>
    );
  };
  const renderFinancialData = useCallback((label, data) => {
    let data1 = data || "N/A";
    return (
      <View style={styles.outer1}>
        <Text style={styles.performanceLabel}>{label}</Text>
        <Text style={styles.performanceValue}>{data1}</Text>
      </View>
    );
  }, []);

  const renderPerformance = useCallback((label1, label2, data1, data2) => {
    return (
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Text style={[styles.performanceLabel, styles.left]}>{label1}</Text>
          <Text style={[styles.performanceValue, styles.left]}>₹{data1}</Text>
        </View>
        <View style={styles.inner}>
          <Text style={[styles.performanceLabel, styles.right]}>{label2}</Text>
          <Text style={[styles.performanceValue, styles.right]}>₹{data2}</Text>
        </View>
      </View>
    );
  }, []);

  const timeRangeButtons = ["1D", "1W", "1M", "1Y", "5Y", "All"];
  if (Error) return <ErrorCom />;
  return (
    <>
      {loading || rangeloading ? (
        <Loader />
      ) : (
        <View style={[styles.container]}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Icon name="ios-arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleBookmark}
              style={styles.bookmarkButton}
            >
              <Icon
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={30}
                color={isBookmarked ? "green" : "#fff"}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.mid}>
            <View>
              <View style={styles.stockInfo}>
                {gdata.header.logoUrl ? (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: gdata.header.logoUrl }}
                      style={styles.stockImage}
                    />
                  </View>
                ) : (
                  <></>
                )}

                <Text style={styles.stockName}>
                  {gdata.header.displayName || "N/A"}
                </Text>
                <Text style={styles.stockPrice}>
                  ₹{parseFloat(latest.ltp || 0).toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.stockChange,
                    changeValue < 0
                      ? styles.negativeChange
                      : styles.positiveChange,
                  ]}
                >
                  {parseFloat(changeValue || 0).toFixed(2)} (
                  {changePerc.toFixed(2)}% )
                </Text>
              </View>

              <View style={styles.chartContainer}>
                <View style={{ flex: 1 }}>
                  {changeValue < 0 ? (
                    <Chart2
                      // arr={chartarr}
                      // time={charttime}
                      // chartConfig={chartConfig}
                      ChartData={chart[range].candles}
                      color="rgb(255, 0, 0)"
                    />
                  ) : (
                    <Chart2
                      // arr={chartarr}
                      // time={charttime}
                      // chartConfig={chartConfig1}
                      ChartData={chart[range].candles}
                      color="rgb(0, 128, 0)"
                    />
                  )}
                </View>
              </View>

              <View style={styles.timeRangeButtons}>
                {timeRangeButtons.map((button, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeRangeButton,
                      range.toLowerCase() === button.toLowerCase() &&
                        styles.activeTimeRangeButton,
                    ]}
                    onPress={() => {
                      let newRange = "";
                      switch (button.toLowerCase()) {
                        case "1d":
                          newRange = "1d";
                          break;
                        case "1w":
                          newRange = "1w";
                          break;
                        case "1m":
                          newRange = "1m";
                          break;
                        case "1y":
                          newRange = "1y";
                          break;
                        case "5y":
                          newRange = "5y";
                          break;
                        case "all":
                          newRange = "all";
                          break;
                        default:
                          break;
                      }
                      setRange(newRange);
                    }}
                  >
                    <Text
                      style={[
                        styles.timeRangeButtonText,
                        range.toLowerCase() === button.toLowerCase() &&
                          styles.activeTimeRangeButtonText,
                      ]}
                    >
                      {button}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.tabrow}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "Overview" && styles.activeTab,
                  ]}
                  onPress={() => handleTabClick("Overview")}
                >
                  <Text style={styles.tabText}>Overview</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tab, activeTab === "News" && styles.activeTab]}
                  onPress={() => handleTabClick("News")}
                >
                  <Text style={styles.tabText}>News</Text>
                </TouchableOpacity>
              </View>
              {activeTab === "Overview" ? overview() : fnews()}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.footerButton, styles.sellButton]}
              onPress={handleSell}
            >
              <Text style={styles.footerButtonText}>Sell</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.footerButton, styles.buyButton]}
              onPress={handleBuy}
            >
              <Text style={styles.footerButtonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  mid: {
    marginBottom: 100,
  },

  backButton: {
    marginRight: 10,
  },
  bookmarkButton: {
    marginLeft: 10,
  },
  stockInfo: {
    padding: 15,
  },
  stockImage: {
    width: 60, // Adjust the width as needed
    height: 60, // Adjust the height as needed
    borderRadius: 20, // Make it a circle if you want
    marginRight: 10, // Add margin if needed
  },
  stockName: {
    color: "#fff",
    fontSize: 25, // Larger font size for the stock name
    fontWeight: "bold",
    margin: 2,
  },
  stockPrice: {
    color: "#fff",
    fontSize: 19,
    margin: 4,
  },
  stockChange: {
    color: "green", // Color for positive change
    margin: 2,
  },
  chartContainer: {
    // flex: 1,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  timeRangeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  timeRangeButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  activeTimeRangeButton: {
    backgroundColor: "#fff",
  },
  timeRangeButtonText: {
    color: "#fff",
  },
  negativeChange: {
    color: "red", // Color for negative change
    fontSize: 12,
  },
  positiveChange: {
    color: "green", // Color for positive change
    fontSize: 12,
  },
  activeTimeRangeButtonText: {
    color: "#000",
  },
  performanceSection: {
    backgroundColor: "#000",
    padding: 10,
    paddingBottom: 0,
    marginTop: 10,
  },
  performanceTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  performanceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    padding: 7,
  },
  performanceLabel: {
    color: "grey",
    fontSize: 16,
    // fontWeight: 600,
    // marginBottom: 4,
    // alignSelf: "center",
  },
  performanceValue: {
    color: "#fff",
    fontSize: 14,
    // marginBottom: 4,

    // alignSelf: "center",
  },

  outer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 5,
    marginTop: 15,
    padding: 7,
    // alignContent: "space-between",
  },
  outer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 5,
    marginTop: 0,
    padding: 7,
    // alignContent: "space-between",
  },
  left: {
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  right: {
    alignSelf: "flex-end",
    marginBottom: 4,
  },
  inner: {
    marginBottom: 4,
  },
  about: {
    flexDirection: "column",
  },
  label: {
    alignSelf: "center",
    fontSize: 20,
  },
  text: {},
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#333333",
  },
  footerButton: {
    flex: 1,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  sellButton: {
    backgroundColor: "red",
    marginRight: 5,
  },
  disabledButton: {
    backgroundColor: "lightcoral", // Light red color for disabled state
  },
  buyButton: {
    backgroundColor: "green",
    marginLeft: 5,
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabrow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 2,
    borderBottomColor: "#121212",
    paddingBottom: 0,
    marginTop: 8,
  },
  tab: {
    paddingVertical: 10,
    width: 90,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "green",
  },
  newsItem: {
    backgroundColor: "black", // Dark background color
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "grey",
  },
  source: {
    fontSize: 14,
    color: "lightgrey",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  newscontainer: {
    // flex: 1,
    backgroundColor: "#121212", // Dark background color
    padding: 16,
  },
});

export default StockPage;

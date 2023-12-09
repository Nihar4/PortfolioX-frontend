import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Chart from "./Chart";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";
import Loader from "../Layout/Loader";
import {
  useMessageAndErrorOther,
  useMessageAndErrorProfile,
} from "../../utils/hooks";
import { addToPlaylist, removeFromPlaylist } from "../../redux/action/profile";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../redux/store";
import { loadUser } from "../../redux/action/user";
import ErrorCom from "../Layout/ErrorCom";

const StockPage = ({ route, navigation }) => {
  const [chart, setChart] = useState({});
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [inter, setInter] = useState("5m");
  const [range, setRange] = useState("1d");
  const [chartarr, setchartarr] = useState([]);
  const [charttime, setcharttime] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { symbol } = route.params;
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const loading1 = useMessageAndErrorProfile(navigation, dispatch, null);
  // const { user } = useSelector((state) => state.user);
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  // console.log(user);

  // setLoading(loading1);

  const toggleBookmark = async () => {
    // setIsBookmarked(!isBookmarked); // Toggle bookmark status
    // console.log(
    //   "Bookmark status:",
    //   isBookmarked,
    //   symbol,
    //   coin.quoteType.longName
    // );
    if (isBookmarked) {
      console.log("remove");
      await dispatch(removeFromPlaylist(coin.quoteType.longName, symbol));
      await dispatch(loadUser());
    } else {
      console.log("add");
      await dispatch(addToPlaylist(coin.quoteType.longName, symbol));
      await dispatch(loadUser());
    }
    // console.log(user);
  };

  const handleBuy = () => {
    navigation.navigate("Subscribe", {
      name: coin.quoteType.longName,
      symbol: symbol,
      avgbuyingprice: chart.meta.regularMarketPrice,
    });
    console.log("Buy button clicked", symbol);
  };

  const handleSell = () => {
    console.log("Sell button clicked", symbol);
  };
  const chartConfig = {
    backgroundGradientFrom: "#000",
    backgroundGradientTo: "#000",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(237, 14, 14, ${opacity})`,
    labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  const chartConfig1 = {
    backgroundGradientFrom: "#000",
    backgroundGradientTo: "#000",
    decimalPlaces: 2,
    color: (opacity = 0.5) => `rgba(34, 139, 34, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  useEffect(() => {
    const fetchCoin = async () => {
      setChart({});
      setCoin({});
      setchartarr([]);
      setcharttime([]);
      setLoading(true);
      setError(false);
      // setIsBookmarked(false);
      // setInter("5m");
      // setRange("1d");
      // console.log("hello here");

      try {
        const response = await axios.get(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=US&lang=en-US&includePrePost=false&interval=${inter}&range=${range}&corsDomain=finance.yahoo.com&.tsrc=finance`
        );
        const response1 = await axios.get(
          `https://query1.finance.yahoo.com/v6/finance/quoteSummary/${symbol}?modules=financialData&modules=quoteType&modules=defaultKeyStatistics&modules=assetProfile&modules=summaryDetail&ssl=true`
        );
        setChart(response.data.chart.result[0]);
        setCoin(response1.data.quoteSummary.result[0]);
        setchartarr(response.data.chart.result[0].indicators.quote[0].close);
        setcharttime(response.data.chart.result[0].timestamp);

        if (chartarr.length !== charttime.length) {
          // console.log("diff");
          setError(true);
        }
        let temp = response.data.chart.result[0].indicators.quote[0].close;
        // console.log(temp);
        if (temp[0] === null) temp[0] = 0;
        for (let i = 1; i < temp.length; i++) {
          if (temp[i] === null) {
            temp[i] = temp[i - 1];
          }
        }
        // console.log(temp);

        setchartarr(temp);

        // let progress = 0;

        if (
          response1.data.quoteSummary.result[0].summaryDetail
            .regularMarketDayHigh.raw &&
          response1.data.quoteSummary.result[0].summaryDetail
            .regularMarketDayLow.raw &&
          response1.data.quoteSummary.result[0].summaryDetail
            .regularMarketDayHigh.raw !==
            response1.data.quoteSummary.result[0].summaryDetail
              .regularMarketDayLow.raw
        ) {
          const progress =
            (response.data.chart.result[0].meta.regularMarketPrice -
              response1.data.quoteSummary.result[0].summaryDetail
                .regularMarketDayLow.raw) /
            (response1.data.quoteSummary.result[0].summaryDetail
              .regularMarketDayHigh.raw -
              response1.data.quoteSummary.result[0].summaryDetail
                .regularMarketDayLow.raw);
          // console.log(progress);
          setProgress(progress);
        }
        // console.log("in user ", user);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log("error here ", error);
        setLoading(false);
        setError(true);
      }
    };
    fetchCoin();
  }, [route.params, range, route]);

  useEffect(() => {
    console.log("load");
    // console.log(user);
    setIsBookmarked(false);
    if (isAuthenticated) {
      user.watchlist.map((item, index) => {
        if (
          // item.name ===
          //   response1.data.quoteSummary.result[0].quoteType.longName &&
          item.symbol === symbol
        ) {
          // console.log("match");
          setIsBookmarked(true);
          return;
        }
      });
    }
  }, [route.params, user, isAuthenticated]);

  const timeRangeButtons = ["1D", "5D", "1MO", "1Y", "5Y", "MAX"];
  if (Error) return <ErrorCom />;
  return (
    <>
      {loading ? (
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
                <Text style={styles.stockName}>
                  {coin.quoteType.longName || "N/A"}
                </Text>
                <Text style={styles.stockPrice}>
                  ₹{parseFloat(chart.meta.regularMarketPrice || 0).toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.stockChange,
                    chart.meta.regularMarketPrice -
                      chart.meta.chartPreviousClose <
                    0
                      ? styles.negativeChange
                      : styles.positiveChange,
                  ]}
                >
                  {parseFloat(
                    chart.meta.regularMarketPrice -
                      chart.meta.chartPreviousClose || 0
                  ).toFixed(2)}{" "}
                  (
                  {(
                    ((chart.meta.regularMarketPrice -
                      chart.meta.chartPreviousClose) /
                      chart.meta.chartPreviousClose) *
                    100
                  ).toFixed(2)}
                  % )
                </Text>
              </View>

              <View style={styles.chartContainer}>
                <View style={{ flex: 1 }}>
                  {chart.meta.regularMarketPrice -
                    chart.meta.chartPreviousClose <
                  0 ? (
                    <Chart
                      arr={chartarr}
                      time={charttime}
                      chartConfig={chartConfig}
                    />
                  ) : (
                    <Chart
                      arr={chartarr}
                      time={charttime}
                      chartConfig={chartConfig1}
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
                      let newInter = "";
                      setLoading(true);
                      switch (button.toLowerCase()) {
                        case "1d":
                          newRange = "1d";
                          newInter = "5m";
                          break;
                        case "5d":
                          newRange = "5d";
                          newInter = "1h";
                          break;
                        case "1mo":
                          newRange = "1mo";
                          newInter = "1d";
                          break;
                        case "1y":
                          newRange = "1y";
                          newInter = "1wk";
                          break;
                        case "5y":
                          newRange = "5y";
                          newInter = "1mo";
                          break;
                        case "max":
                          newRange = "max";
                          newInter = "3mo";
                          break;
                        default:
                          break;
                      }

                      setRange(newRange);
                      setInter(newInter);
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

              <View style={styles.performanceSection}>
                <Text style={styles.performanceTitle}>Performance</Text>
                {renderperfomance(
                  "Today's Low",
                  "Today's High",
                  coin.summaryDetail.regularMarketDayLow.raw,
                  coin.summaryDetail.regularMarketDayHigh.raw
                )}

                <View style={styles.progressBarContainer}>
                  <ProgressBar
                    progress={progress}
                    color={
                      chart.meta.regularMarketPrice <
                      coin.summaryDetail.fiftyTwoWeekLow.raw
                        ? "red"
                        : "green"
                    }
                  />
                </View>

                {renderperfomance(
                  "52 Week Low",
                  "52 Week High",
                  coin.summaryDetail.fiftyTwoWeekLow.raw,
                  coin.summaryDetail.fiftyTwoWeekHigh.raw
                )}

                <View style={styles.progressBarContainer}>
                  <ProgressBar
                    progress={
                      coin.summaryDetail.fiftyTwoWeekLow &&
                      coin.summaryDetail.fiftyTwoWeekHigh
                        ? (chart.meta.regularMarketPrice -
                            coin.summaryDetail.fiftyTwoWeekLow.raw) /
                          (coin.summaryDetail.fiftyTwoWeekHigh.raw -
                            coin.summaryDetail.fiftyTwoWeekLow.raw)
                        : 0
                    }
                    color={
                      chart.meta.regularMarketPrice <
                      coin.summaryDetail.fiftyTwoWeekLow.raw
                        ? "red"
                        : "green"
                    }
                  />
                </View>

                {renderperfomance(
                  "Open",
                  "Prev. Close",
                  coin.summaryDetail.regularMarketOpen.raw,
                  coin.summaryDetail.regularMarketPreviousClose.raw
                )}
                {(() => {
                  try {
                    return renderFinancialData(
                      "Volume",
                      coin.summaryDetail.volume.raw
                    );
                  } catch (error) {
                    return renderFinancialData("Volume", "N/A");
                  }
                })()}
              </View>

              <View style={styles.performanceSection}>
                <Text style={styles.performanceTitle}>Financial Data</Text>
                {(() => {
                  try {
                    return renderFinancialData(
                      "MarketCap",
                      coin.summaryDetail.marketCap.fmt
                    );
                  } catch (error) {
                    return renderFinancialData("MarketCap", "N/A");
                  }
                })()}
                {(() => {
                  try {
                    return renderFinancialData(
                      "trailingPE",
                      coin.summaryDetail.trailingPE.fmt
                    );
                  } catch (error) {
                    return renderFinancialData("trailingPE", "N/A");
                  }
                })()}
                {(() => {
                  try {
                    return renderFinancialData(
                      "priceToBook",
                      coin.defaultKeyStatistics.priceToBook.fmt
                    );
                  } catch (error) {
                    return renderFinancialData("priceToBook", "N/A");
                  }
                })()}
                {(() => {
                  try {
                    return renderFinancialData(
                      "debtToEquity",
                      coin.financialData.debtToEquity.fmt
                    );
                  } catch (error) {
                    return renderFinancialData("debtToEquity", "N/A");
                  }
                })()}
                {(() => {
                  try {
                    return renderFinancialData(
                      "trailingEps",
                      coin.defaultKeyStatistics.trailingEps.fmt
                    );
                  } catch (error) {
                    return renderFinancialData("trailingEps", "N/A");
                  }
                })()}
                {(() => {
                  try {
                    return renderFinancialData(
                      "dividendYield",
                      coin.summaryDetail.dividendYield.fmt
                    );
                  } catch (error) {
                    return renderFinancialData("dividendYield", "N/A");
                  }
                })()}
                {(() => {
                  try {
                    return renderFinancialData(
                      "bookValue",
                      coin.defaultKeyStatistics.bookValue.fmt
                    );
                  } catch (error) {
                    return renderFinancialData("bookValue", "N/A");
                  }
                })()}
              </View>

              <View style={styles.performanceSection}>
                <Text style={styles.performanceTitle}>About Company</Text>
                {(() => {
                  try {
                    return (
                      <View style={[styles.outer1, styles.about]}>
                        <Text style={[styles.performanceValue, styles.text]}>
                          {coin.assetProfile.longBusinessSummary}
                        </Text>
                      </View>
                    );
                  } catch (error) {}
                })()}

                {(() => {
                  try {
                    return renderFinancialData(
                      "Industry",
                      coin.assetProfile.industry
                    );
                  } catch (error) {
                    return renderFinancialData("Industry", "N/A");
                  }
                })()}
                {(() => {
                  try {
                    return renderFinancialData(
                      "Sector",
                      coin.assetProfile.sector
                    );
                  } catch (error) {
                    return renderFinancialData("Sector", "N/A");
                  }
                })()}
                {(() => {
                  try {
                    return renderFinancialData(
                      "Website",
                      coin.assetProfile.website
                    );
                  } catch (error) {
                    return renderFinancialData("Website", "N/A");
                  }
                })()}
              </View>
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
const renderFinancialData = (label, data) => {
  let data1 = data;
  // console.log(data);
  if (data === undefined) data1 = "N/A";
  return (
    <View style={styles.outer1}>
      <Text style={styles.performanceLabel}>{label}</Text>
      <Text style={styles.performanceValue}>{data1}</Text>
    </View>
  );
};

const renderperfomance = (label1, label2, data1, data2) => {
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
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
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
  buyButton: {
    backgroundColor: "green",
    marginLeft: 5,
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StockPage;

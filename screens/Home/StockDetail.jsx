import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Linking,
} from "react-native";
import Chart from "./Chart";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";
import Loader from "../Layout/Loader";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  useMessageAndErrorOther,
  useMessageAndErrorProfile,
} from "../../utils/hooks";
import { addToPlaylist, removeFromPlaylist } from "../../redux/action/profile";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../redux/store";
import { loadUser } from "../../redux/action/user";
import ErrorCom from "../Layout/ErrorCom";
import Chart2 from "./Chart2";

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
  const { symbol, id } = route.params;
  const [progress, setProgress] = useState(0);
  const [sellBtn, SetsellBtn] = useState(false);
  const [gdata, setGdata] = useState({});
  const [activeTab, setActiveTab] = useState("Overview");
  const [news, setNews] = useState([]);

  const handleTabClick = (tabName) => {
    // console.log(tabName);
    setActiveTab(tabName);
  };
  // console.log(news.length);
  // const [sellBtn, SetbuyBtn] = useState(true);

  const dispatch = useDispatch();

  const loading1 = useMessageAndErrorProfile(navigation, dispatch, null);
  // const { user } = useSelector((state) => state.user);
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const toggleBookmark = async () => {
    // setIsBookmarked(!isBookmarked); // Toggle bookmark status

    if (isBookmarked) {
      await dispatch(
        removeFromPlaylist(coin.quote.longName, symbol, gdata.header.searchId)
      );
      await dispatch(loadUser());
    } else {
      await dispatch(
        addToPlaylist(coin.quote.longName, symbol, gdata.header.searchId)
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
        name: coin.quote.longName,
        symbol: symbol,
        avgbuyingprice: chart.meta.regularMarketPrice,
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
          name: coin.quote.longName,
          symbol: symbol,
          avgbuyingprice: chart.meta.regularMarketPrice,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "You haven't bought this stock, so you can't sell it. ",
        });
      }
    }
  };
  const NewsItem = ({ title, source, url }) => {
    const handleNewsClick = () => {
      // Open the URL when a news item is clicked
      Linking.openURL(url);
    };

    return (
      <TouchableOpacity onPress={handleNewsClick}>
        <View style={styles.newsItem}>
          <Text style={styles.source}>{source}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const fnews = () => {
    return (
      <>
        <ScrollView style={styles.newscontainer}>
          {news.length === 0 ? (
            <>
              <Text style={styles.performanceTitle}>No News Found</Text>
            </>
          ) : (
            <>
              {news.map((news, index) => (
                <NewsItem
                  key={index}
                  title={news.title}
                  source={news.source}
                  url={news.url}
                />
              ))}
            </>
          )}
        </ScrollView>
      </>
    );
  };
  const overview = () => {
    return (
      <>
        <View style={styles.performanceSection}>
          <Text style={styles.performanceTitle}>Performance</Text>
          {renderperfomance(
            "Today's Low",
            "Today's High",
            coin.quote.regularMarketDayLow,
            coin.quote.regularMarketDayHigh
          )}

          <View style={styles.progressBarContainer}>
            <ProgressBar
              progress={progress}
              color={
                chart.meta.regularMarketPrice < coin.quote.fiftyTwoWeekLow
                  ? "red"
                  : "green"
              }
            />
          </View>

          {renderperfomance(
            "52 Week Low",
            "52 Week High",
            coin.quote.fiftyTwoWeekLow,
            coin.quote.fiftyTwoWeekHigh
          )}

          <View style={styles.progressBarContainer}>
            <ProgressBar
              progress={
                coin.quote.fiftyTwoWeekLow && coin.quote.fiftyTwoWeekHigh
                  ? (chart.meta.regularMarketPrice -
                      coin.quote.fiftyTwoWeekLow) /
                    (coin.quote.fiftyTwoWeekHigh - coin.quote.fiftyTwoWeekLow)
                  : 0
              }
              color={
                chart.meta.regularMarketPrice < coin.quote.fiftyTwoWeekLow
                  ? "red"
                  : "green"
              }
            />
          </View>

          {renderperfomance(
            "Open",
            "Prev. Close",
            coin.quote.regularMarketOpen,
            coin.quote.regularMarketPreviousClose
          )}
          {(() => {
            try {
              return renderFinancialData(
                "Volume",
                coin.quote.regularMarketVolume
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
              return renderFinancialData("MarketCap", coin.quote.marketCap);
            } catch (error) {
              return renderFinancialData("MarketCap", "N/A");
            }
          })()}
          {(() => {
            try {
              return renderFinancialData("trailingPE", coin.quote.trailingPE);
            } catch (error) {
              return renderFinancialData("trailingPE", "N/A");
            }
          })()}
          {(() => {
            try {
              return renderFinancialData("priceToBook", coin.quote.priceToBook);
            } catch (error) {
              return renderFinancialData("priceToBook", "N/A");
            }
          })()}
          {/* {(() => {
                  try {
                    return renderFinancialData(
                      "debtToEquity",
                      coin.quote.debtToEquity
                    );
                  } catch (error) {
                    return renderFinancialData("debtToEquity", "N/A");
                  }
                })()} */}
          {(() => {
            try {
              return renderFinancialData(
                "trailingEps",
                coin.quote.epsTrailingTwelveMonths
              );
            } catch (error) {
              return renderFinancialData("trailingEps", "N/A");
            }
          })()}
          {(() => {
            try {
              return renderFinancialData(
                "dividendYield",
                coin.quote.dividendYield
              );
            } catch (error) {
              return renderFinancialData("dividendYield", "N/A");
            }
          })()}
          {(() => {
            try {
              return renderFinancialData("bookValue", coin.quote.bookValue);
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
                    {gdata.details.businessSummary}
                  </Text>
                </View>
              );
            } catch (error) {}
          })()}

          {(() => {
            try {
              return renderFinancialData("Industry", gdata.header.industryName);
            } catch (error) {
              return renderFinancialData("Industry", "N/A");
            }
          })()}
          {(() => {
            try {
              return renderFinancialData(
                "foundedYear",
                gdata.details.foundedYear
              );
            } catch (error) {
              return renderFinancialData("foundedYear", "N/A");
            }
          })()}
          {(() => {
            try {
              return renderFinancialData("Website", gdata.details.websiteUrl);
            } catch (error) {
              return renderFinancialData("Website", "N/A");
            }
          })()}
        </View>
      </>
    );
  };

  const chartConfig = {
    // backgroundGradientFrom: "#000",
    // backgroundGradientTo: "#000",
    // backgroundColor: "#FFF",
    decimalPlaces: 2,
    // propsForVerticalLabels: {
    //   display: false, // Hide vertical labels
    // },
    // propsForHorizontalLabels: {
    //   display: false, // Hide horizontal labels
    // },
    color: (opacity = 1) => `rgb(255, 0, 0)`,
    labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      // color: "red",
      borderRadius: 16,
    },
  };
  const chartConfig1 = {
    // backgroundGradientFrom: "#000",
    // backgroundGradientTo: "#000",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgb(0, 128, 0)`,
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
      // console.log(symbol, id);

      try {
        const response = await axios.get(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=US&lang=en-US&includePrePost=false&interval=${inter}&range=${range}&corsDomain=finance.yahoo.com&.tsrc=finance`
        );
        const response1 = await axios.get(
          `https://query1.finance.yahoo.com/v7/finance/options/${symbol}?modules=financialData`
        );
        const response2 = await axios.get(
          `https://groww.in/v1/api/stocks_data/v1/company/search_id/${id}`
        );

        //groww.in/v1/api/stocks_company_master/v1/company_news/groww_contract_id/GSTK539254?page=0&size=100

        setChart(response.data.chart.result[0]);
        setCoin(response1.data.optionChain.result[0]);
        setchartarr(response.data.chart.result[0].indicators.quote[0].close);
        setcharttime(response.data.chart.result[0].timestamp);
        setGdata(response2.data);
        const response3 = await axios.get(
          `https://groww.in/v1/api/stocks_company_master/v1/company_news/groww_contract_id/${response2.data.header.growwCompanyId}?page=0&size=100`
        );
        setNews(response3.data.results);
        // console.log(news);

        if (chartarr.length !== charttime.length) {
          setError(true);
        }
        let temp = response.data.chart.result[0].indicators.quote[0].close;
        if (temp[0] === null) temp[0] = 0;
        for (let i = 1; i < temp.length; i++) {
          if (temp[i] === null) {
            temp[i] = temp[i - 1];
          }
        }

        setchartarr(temp);

        if (
          response1.data.optionChain.result[0].quote.regularMarketDayHigh &&
          response1.data.optionChain.result[0].quote.regularMarketDayLow &&
          response1.data.optionChain.result[0].quote.regularMarketDayHigh !==
            response1.data.optionChain.result[0].quote.regularMarketDayLow
        ) {
          const progress =
            (response.data.chart.result[0].meta.regularMarketPrice -
              response1.data.optionChain.result[0].quote.regularMarketDayLow) /
            (response1.data.optionChain.result[0].quote.regularMarketDayHigh -
              response1.data.optionChain.result[0].quote.regularMarketDayLow);
          setProgress(progress);
        }
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log("error in stockDetail.jsx ", error);
        setLoading(false);
        setError(true);
      }
    };
    fetchCoin();
  }, [route.params, range, route]);

  useEffect(() => {
    SetsellBtn(false);
    setIsBookmarked(false);
    setInter("5m");
    setRange("1d");
    if (isAuthenticated && user) {
      const sellBtn = user.portfolio.some((item) => item.symbol === symbol);
      if (sellBtn) SetsellBtn(true);
      user.watchlist.map((item, index) => {
        if (item.symbol === symbol) {
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
                  {coin.quote.longName || "N/A"}
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
                    <Chart2
                      // arr={chartarr}
                      // time={charttime}
                      // chartConfig={chartConfig}
                      ChartData={chart}
                      color="rgb(255, 0, 0)"
                    />
                  ) : (
                    <Chart2
                      // arr={chartarr}
                      // time={charttime}
                      // chartConfig={chartConfig1}
                      ChartData={chart}
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
                      let newInter = "";
                      setLoading(true);
                      switch (button.toLowerCase()) {
                        case "1d":
                          newRange = "1d";
                          newInter = "5m";
                          break;
                        case "5d":
                          newRange = "5d";
                          newInter = "30m";
                          break;
                        case "1mo":
                          newRange = "1mo";
                          newInter = "1h";
                          break;
                        case "1y":
                          newRange = "1y";
                          newInter = "1d";
                          break;
                        case "5y":
                          newRange = "5y";
                          newInter = "1wk";
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
const renderFinancialData = (label, data) => {
  let data1 = data;
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

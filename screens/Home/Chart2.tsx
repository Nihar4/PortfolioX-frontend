import React from "react";
import { View, Text,Dimensions  } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { colors } from "../../styles/style";
// import { windowWidth } from "../utils/Dimensions";

//TODO: somtimes animated value error comes
//TODO: change some parameters to set the min value for different 1h,1d,etc..
//TODO: change the width and spacing to contain the whole width every time
//TODO: change the money and date format a bit as well

const ScrollingChartWithPointer = ({ ChartData,color }: any ) => {
  
const windowWidth=Dimensions.get('window').width;
  var FilteredData = [];
  const length = ChartData?.length;
  var maxValue = -1;
  var minValue = 1e9;

  for (let i = 0; i < length; i++) {
    minValue=Math.min(ChartData[i][1], minValue);
    // FilteredData.push(obj);
  }


  for (let i = 0; i < length; i++) {
    var obj = {
      value: ChartData[i][1] - minValue,
      date: new Date(ChartData[i][0] * 1000),
    };
    maxValue = Math.max(ChartData[i][1]-minValue, maxValue);
    // minValue=Math.max(ChartData.indicators.quote[0].close[i], minValue);
    FilteredData.push(obj);
  }
  

  return (
    <View
      style={{
        backgroundColor: colors.bg,
      }}
    >
      <LineChart
        // areaChart
        //TODO:data point
        data={FilteredData}
        yAxisLabelWidth={2}
        rotateLabel
        width={windowWidth - 40}
        hideDataPoints
        //TODO:change accoring to interval ig
        spacing={(windowWidth - 30) / length}
        color={color}
        thickness={0}
        initialSpacing={0}
        noOfSections={6}
        stepHeight={50}
        height={300}
        rulesThickness={0}
        maxValue={maxValue}
        yAxisThickness={0}
        xAxisTextNumberOfLines={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{ color: "white" }}
        pointerConfig={{
          pointerStripHeight: 160,
          pointerStripColor: "white",
          pointerStripWidth: 2,
          pointerColor: "white",
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          // activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,
          pointerLabelComponent: (items: any) => {
            return (
              <View
                style={{
                  height: 90,
                  width: 100,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,

                    marginBottom: 6,
                    textAlign: "center",
                  }}
                >
                  {items[0].date.toString()}
                </Text>

                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 16,
                    // backgroundColor: "black",
                  }}
                >
                  <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {"₹" + (items[0].value ? (minValue + items[0].value).toFixed(2) : "")}
                  </Text>

                </View>
              </View>
            );
          },
        }}
      />
    </View>
  );
};

export default ScrollingChartWithPointer;

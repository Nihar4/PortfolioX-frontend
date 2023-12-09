import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import { colors, defaultStyle } from "../../styles/style";
import { ScrollView } from "react-native-gesture-handler";

const Chart = ({ arr = [], time = [], chartConfig }) => {
  const screenWidth = Dimensions.get("window").width;
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Create an empty array of labels (no time labels)
  const labels = Array(arr.length).fill("");

  const handleDataPointClick = ({ value, index, getColor }) => {
    const unixTimestamp = time[index];
    const dateObj = new Date(unixTimestamp * 1000);

    // Convert UTC to IST (add 5 hours and 30 minutes for the offset)
    dateObj.setHours(dateObj.getHours() + 5);
    dateObj.setMinutes(dateObj.getMinutes() + 30);

    // Format the date to a string in IST with the desired format
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours() % 12 || 12;
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");
    const amOrPm = dateObj.getHours() >= 12 ? "PM" : "AM";

    const dateString = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${amOrPm}`;
    setSelectedPoint({ value, time: dateString });
  };

  return (
    <View>
      <ScrollView horizontal style={[styles.test]}>
        <LineChart
          data={{
            time,
            datasets: [
              {
                data: arr,
                pointRadius: 0, // Set pointRadius to 0 to hide data points
              },
            ],
          }}
          width={screenWidth - 20}
          // yAxisInterval={100}
          // yLabelsOffset={0}
          // xLabelsOffset={0}
          // yAxisLabel={""} // No text for horizontal labels
          // yAxisSuffix={""} // No text for horizontal labels
          // xAxisLabel={""} // No text for vertical labels
          // withShadow={false}
          height={300} // Increased height
          chartConfig={chartConfig}
          withDots={true}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          yLabelsOffset={0}
          xLabelsOffset={0}
          bezier
          style={{
            // marginVertical: 0,
            borderRadius: 0,
            paddingRight: 0,
            margin: 0,
            backgroundColor: "red",
            // borderWidth: 1,
            // borderColor: "red",
          }}
          onDataPointClick={handleDataPointClick}
        />

        {selectedPoint && (
          <View style={styles.tooltip}>
            <Text
              style={styles.tooltipText}
            >{`Price: ${selectedPoint.value.toFixed(2)}`}</Text>
            <Text
              style={styles.tooltipText}
            >{`Time: ${selectedPoint.time}`}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = {
  tooltip: {
    position: "absolute",
    backgroundColor: colors.bg,
    padding: 0,
    borderRadius: 1,
    bottom: 20,
    right: 20,
    fontSize: 20,
  },
  tooltipText: {
    color: "white",
    fontSize: 10,
    marginBottom: 5,
  },
  test: {
    padding: 0,
    // borderWidth: 1,
    // borderColor: "red",
  },
};

export default Chart;

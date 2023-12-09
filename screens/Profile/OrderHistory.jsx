import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../styles/style";

const OrderHistory = () => {
  const { loading, message, error, user } = useSelector((state) => state.user);
  const [sortColumn, setSortColumn] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order

  const handleSort = (key) => {
    if (key === sortColumn) {
      // Reverse the sorting order if the same column is clicked again
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(key);
      setSortOrder("asc"); // Default to ascending order when a new column is selected
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const sortedHistory = [...user.History].sort((a, b) => {
    const sortOrderFactor = sortOrder === "asc" ? 1 : -1;
    if (sortColumn === "name") {
      return sortOrderFactor * a.name.localeCompare(b.name);
    }
    if (sortColumn === "quantity") {
      return sortOrderFactor * (a.quantity - b.quantity);
    }
    if (sortColumn === "Price") {
      return sortOrderFactor * (a.Price - b.Price);
    }
    if (sortColumn === "status") {
      return sortOrderFactor * a.status.localeCompare(b.status);
    }
    if (sortColumn === "date") {
      return sortOrderFactor * (new Date(a.date) - new Date(b.date));
    }
    return 0;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order History</Text>
      <ScrollView horizontal>
        <ScrollView style={styles.scrollView}>
          <View style={styles.table}>
            <View style={[styles.headerRow, styles.dataRow]}>
              <Text
                style={[styles.headerCell, styles.cellName, styles.columnName]}
                onPress={() => handleSort("name")}
              >
                Name{" "}
                {sortColumn === "name" && (sortOrder === "asc" ? "🔼" : "🔽")}
              </Text>
              <Text
                style={[styles.headerCell, styles.columnQuantity]}
                onPress={() => handleSort("quantity")}
              >
                Quantity{" "}
                {sortColumn === "quantity" &&
                  (sortOrder === "asc" ? "🔼" : "🔽")}
              </Text>
              <Text
                style={[styles.headerCell, styles.columnPrice]}
                onPress={() => handleSort("Price")}
              >
                Price{" "}
                {sortColumn === "Price" && (sortOrder === "asc" ? "🔼" : "🔽")}
              </Text>
              <Text
                style={[styles.headerCell, styles.columnStatus]}
                onPress={() => handleSort("status")}
              >
                Status{" "}
                {sortColumn === "status" && (sortOrder === "asc" ? "🔼" : "🔽")}
              </Text>
              <Text
                style={[styles.headerCell, styles.columnDate]}
                onPress={() => handleSort("date")}
              >
                Date{" "}
                {sortColumn === "date" && (sortOrder === "asc" ? "🔼" : "🔽")}
              </Text>
            </View>
            {sortedHistory.map((order, index) => (
              <View key={index} style={styles.dataRow}>
                <Text
                  style={[styles.dataCell, styles.cellName, styles.columnName]}
                >
                  {order.name}
                </Text>
                <Text style={[styles.dataCell, styles.columnQuantity]}>
                  {order.quantity}
                </Text>
                <Text style={[styles.dataCell, styles.columnPrice]}>
                  {order.Price}
                </Text>
                <Text style={[styles.dataCell, styles.columnStatus]}>
                  {order.status}
                </Text>
                <Text style={[styles.dataCell, styles.columnDate]}>
                  {formatDate(order.date)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
    marginTop: 10,
  },
  scrollView: {
    // maxHeight: , // Set a maximum height to enable vertical scrolling
  },
  table: {
    // borderColor: colors.tex, // Border color
    // borderWidth: 1,
  },
  headerRow: {
    flexDirection: "row",
    // borderColor: "red", // Red border
    // borderWidth: 1, // 1px border width
  },
  headerCell: {
    color: colors.text,
    padding: 20,
    // borderColor: "red", // Red border
    // borderWidth: 1, // 1px border width
    width: 100,
  },
  dataRow: {
    flexDirection: "row",
    borderColor: "grey", // Border color
    borderBottomWidth: 1,
    // borderColor: "red", // Red border
    // borderWidth: 1, // 1px border width
  },
  dataCell: {
    padding: 20,
    // marginRight: 50,
    color: colors.text,
    // borderColor: "red", // Red border
    // borderWidth: 1, // 1px border width
    width: 100,
  },
  cellName: {
    flex: 1,
  },
  // Separate styles for each column
  columnName: {
    width: 200, // Adjust the width as needed
  },
  columnQuantity: {
    width: 120,
  },
  columnPrice: {
    width: 100,
  },
  columnStatus: {
    width: 150,
  },
  columnDate: {
    width: 150,
  },
});

export default OrderHistory;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../../styles/style";
import * as Print from "expo-print";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Linking } from "react-native";
import axios from "axios";
import { server } from "../../redux/store";

const Reports = () => {
  const { loading, message, error, user } = useSelector((state) => state.user);
  const [sortColumn, setSortColumn] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [data, setData] = useState(user.History);
  // State for date range filters
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedPrinter, setSelectedPrinter] = useState();

  const handleSort = (key) => {
    if (key === sortColumn) {
      // Reverse the sorting order if the same column is clicked again
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(key);
      setSortOrder("asc"); // Default to ascending order when a new column is selected
    }
  };

  const handleFilter = () => {
    if (fromDate && toDate && user) {
      const filteredHistory = user.History.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= fromDate && orderDate <= toDate;
      });
      setData(filteredHistory);
      setSortColumn("date");
      setSortOrder("asc");
    } else {
      console.log("Please select both From and To dates.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const sortedHistory = [...data].sort((a, b) => {
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

  const print = async () => {
    const html = `
<html>
  <head>
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
     Report 
    </h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${sortedHistory
          .map(
            (order) => `
            <tr>
              <td>${order.name}</td>
              <td>${order.quantity}</td>
              <td>${order.Price}</td>
              <td>${order.status}</td>
              <td>${formatDate(order.date)}</td>
            </tr>
          `
          )
          .join("")}
      </tbody>
    </table>
  </body>
</html>
`;
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };
  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };
  const printexcel = async () => {
    let wb = XLSX.utils.book_new();
    const dataForExcel = [
      ["Name", "Quantity", "Price", "Status", "Date"],
      ...sortedHistory.map((order) => [
        order.name,
        order.quantity,
        order.Price,
        order.status,
        formatDate(order.date),
      ]),
    ];
    let ws = XLSX.utils.aoa_to_sheet(dataForExcel);

    XLSX.utils.book_append_sheet(wb, ws, "MyFirstSheet", true);
    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "Report.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(filename);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Report</Text>
      <View style={styles.dateFilter}>
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            onPress={() => setShow(true)} // Set show to true when "From" button is clicked
            style={styles.datePickerButton} // Use your button style here
          >
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.buttonText}>
              {fromDate ? formatDate(fromDate) : "From"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            onPress={() => setShow1(true)} // Set show1 to true when "To" button is clicked
            style={styles.datePickerButton} // Use your button style here
          >
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.buttonText}>
              {toDate ? formatDate(toDate) : "To"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Button title="Filter" onPress={handleFilter} style={styles.button} /> */}
        <TouchableOpacity style={[styles.button]} onPress={handleFilter}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          style={styles.datePicker}
          value={fromDate || new Date()}
          mode={"date"}
          display="default" // Set the display mode to "default" to show only the date picker
          onChange={(event, date) => {
            setShow(false); // Close the date picker when a date is selected
            setFromDate(date);
          }}
        />
      )}
      {show1 && (
        <DateTimePicker
          style={styles.datePicker}
          value={toDate || new Date()}
          mode={"date"}
          display="default" // Set the display mode to "default" to show only the date picker
          onChange={(event, date) => {
            setShow1(false); // Close the date picker when a date is selected
            setToDate(date);
          }}
        />
      )}

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
      <View style={styles.printButtons}>
        <TouchableOpacity style={[styles.button]} onPress={print}>
          <Text style={styles.buttonText}>Print PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={printexcel}>
          <Text style={styles.buttonText}>Print Excel</Text>
        </TouchableOpacity>
        {Platform.OS === "ios" && (
          <>
            <View style={styles.spacer} />
            <Button title="Select printer" onPress={selectPrinter} />
            <View style={styles.spacer} />
            {selectedPrinter ? (
              <Text
                style={styles.printer}
              >{`Selected printer: ${selectedPrinter.name}`}</Text>
            ) : undefined}
          </>
        )}
      </View>
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
    // maxHeight: 400, // Set a maximum height to enable vertical scrolling
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
    width: 130,
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
  dateFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  printButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  datePicker: {
    marginBottom: 10,
  },
  datePickerContainer: {
    flex: 1,
    marginRight: 8,
    // borderWidth: 0,
    // borderRadius: 50,
    // backgroundColor: "rgba(255, 255, 255, 0.2)", // Add a semi-transparent white background
  },

  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Change the background color as desired
    color: "white",
    padding: 14,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
  },
  dateIcon: {
    fontSize: 20,
  },
});

export default Reports;

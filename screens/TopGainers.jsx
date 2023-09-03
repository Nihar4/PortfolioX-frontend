// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const TopGainers = ({ data }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>TopGainers</Text>
//       {data.map((item, index) => (
//         <View key={index} style={styles.itemContainer}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <Text style={styles.itemPrice}>{item.price}</Text>
//       </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     padding: 16,
//     paddingLeft:50,
//     paddingRight:50,
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     alignSelf:"center",
//   },
//   itemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   itemName: {
//     fontSize: 16,
//   },
//   itemPrice: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default TopGainers;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StockItem from "./StockItem"; // Import the StockItem component

const TopGainers = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TopGainers</Text>
      {data.map((item, index) => (
        <StockItem
          key={index}
          name={item.name}
          price={item.price}
          changePercentage={item.changePercentage}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 8,
    alignSelf:"center",
  },
});

export default TopGainers;
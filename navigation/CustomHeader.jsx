import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform, StatusBar } from "react-native";
import { colors } from "../styles/style";

const CustomHeader = ({ navigation }) => {
  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const handleSearch = () => {
    navigation.navigate("Search");
    // Implement your search logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDrawerOpen}>
        <Ionicons name="menu-outline" size={24} color={colors.btnbg} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSearch}>
        <Ionicons name="search-outline" size={24} color={colors.btnbg} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 100 : 0,
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: colors.header, // Adjust this color to match your color scheme
  },
});

export default CustomHeader;

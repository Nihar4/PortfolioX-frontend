import { StyleSheet, Platform, StatusBar } from "react-native";

export const colors = {
  bg: "#121212", // Dark background
  text: "#FFFFFF",
  btnbg: "#FFD700", // Golden button color
  btntext: "#121212", // Dark text for buttons
  inputbg: "#333333",
  inputtext: "#FFFFFF",
  placeholder: "#A0A0A0",
  Primary: "#FF6347",
  Secondry: "#6CB4EE",
  header: "#2b2b2b",
};

export const defaultStyle = StyleSheet.create({
  //   backgroundColor: theme.colors.primary,
  font: "sans-serif",
  padding: 10,
  // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  backgroundColor: colors.bg,
  flex: 1,
  color: colors.text,
});

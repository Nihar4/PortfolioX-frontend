import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../styles/style";

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Welcome to Our Stock Trading App</Text>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Logo</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Year of Trust</Text>
          <Text style={styles.infoValue}>2020</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Number of Users</Text>
          <Text style={styles.infoValue}>10,000+</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        Our stock trading app is designed to provide you with a seamless and
        intuitive trading experience. Stay updated with real-time market data,
        manage your portfolio, and make informed investment decisions.
      </Text>
      <Text style={styles.paragraph}>
        Whether you're a seasoned investor or just getting started, our app
        caters to all levels of expertise. Analyze stocks, track trends, and
        stay ahead of the game.
      </Text>
      <Text style={styles.subHeading}>Key Features:</Text>
      <View style={styles.feature}>
        <View style={styles.bullet} />
        <Text style={styles.featureText}>Real-time Stock Prices</Text>
      </View>
      <View style={styles.feature}>
        <View style={styles.bullet} />
        <Text style={styles.featureText}>Portfolio Management</Text>
      </View>
      <View style={styles.feature}>
        <View style={styles.bullet} />
        <Text style={styles.featureText}>Customizable Watchlists</Text>
      </View>
      <View style={styles.feature}>
        <View style={styles.bullet} />
        <Text style={styles.featureText}>In-depth Market Analysis</Text>
      </View>
      {/* Year of Trust and Number of Users */}

      {/* Contact Information */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contact Information</Text>
        <Text style={styles.contactInfo}>Phone: 123-456-7890</Text>
        <Text style={styles.contactInfo}>Email: info@example.com</Text>
        <Text style={styles.contactInfo}>Website: www.stockapp.com</Text>
        <Text style={styles.contactInfo}>Location: New York, USA</Text>
      </View>
      <Text style={styles.creatorHeading}>Meet the Creators:</Text>
      <Text style={styles.creatorText}>
        This app was crafted by Nihar and Deep, passionate developers with a
        vision to simplify stock trading for everyone.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.bg, // Dark blue background color
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  logoContainer: {
    // flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 25,
    color: "#ECF0F1",
    marginRight: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ECF0F1",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ECF0F1",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: "#ECF0F1",
  },
  contactContainer: {
    width: "100%",
    // alignItems:"center",
    marginTop: 25,
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ECF0F1",
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: "#ECF0F1",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ECF0F1", // Light gray text color
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ECF0F1",
    marginTop: 10,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ECF0F1",
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#16A085", // Green bullet color
    marginRight: 10,
  },
  featureText: {
    fontSize: 18,
    color: "#ECF0F1",
  },
  creatorHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#ECF0F1",
  },
  creatorText: {
    fontSize: 16,
    marginBottom: 50,
    color: "#ECF0F1",
  },
});

export default AboutUs;

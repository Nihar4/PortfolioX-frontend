import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../styles/style";

const CustomDrawer = (props) => {
  const isAuthenticated = false;
  const drawerItems = [
    { label: "Home", icon: "home", screenName: "Home" },
    { label: "Profile", icon: "person", screenName: "Profile" },
    { label: "About Us", icon: "information-circle", screenName: "AboutUs" },
  ];
  const handleLogin = () => {
    props.navigation.navigate("Login");
  };

  const handleSignUp = () => {
    props.navigation.navigate("Register");
  };

  const handleSignOut = () => {
    console.log("logout");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: colors.bg }}
      >
        <ImageBackground
          source={require("../assets/download.jpeg")}
          style={{ padding: 20, height: 200, justifyContent: "flex-end" }}
        >
          <Image
            source={require("../assets/avtar.jpeg")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: colors.inputtext,
              fontSize: 18,
              // fontFamily: "Roboto_medium",
              marginBottom: 5,
            }}
          >
            John Doe
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, paddingTop: 10 }}>
          {drawerItems.map((item, index) => (
            <DrawerItem
              key={index}
              label={item.label}
              icon={({ color, size, focused }) => (
                <Ionicons
                  name={item.icon}
                  size={size}
                  color={focused ? colors.btnbg : colors.inputtext}
                />
              )}
              focused={
                props.state.routeNames[props.state.index] === item.screenName
              }
              onPress={() => props.navigation.navigate(item.screenName)}
              labelStyle={{
                color: colors.inputtext,
                // fontFamily: "Roboto_medium",
              }}
            />
          ))}
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "#333333",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {isAuthenticated ? (
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              paddingVertical: 15,
              width: 150,
              paddingHorizontal: 10,
              backgroundColor: colors.btnbg,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="exit-outline" size={22} color={colors.btntext} />
              <Text
                style={{
                  fontSize: 15,
                  // fontFamily: "Roboto_medium",
                  marginLeft: 5,
                  color: colors.btntext,
                }}
              >
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                // paddingVertical: 10,
                paddingHorizontal: 12,
                flex: 1,
                height: 50,
                backgroundColor: colors.btnbg,
                marginRight: 5,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="exit-outline"
                  size={22}
                  color={colors.btntext}
                />
                <Text
                  style={{
                    fontSize: 15,
                    // fontFamily: "Roboto_medium",
                    marginLeft: 5,
                    color: colors.btntext,
                  }}
                >
                  Login
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                paddingVertical: 20,
                marginRight: 10,
                color: "#FFFFFF",
                // fontFamily: "Roboto_medium",
              }}
            >
              {" "}
              OR{" "}
            </Text>
            <TouchableOpacity
              onPress={handleSignUp}
              style={{
                // paddingVertical: 10,
                paddingHorizontal: 12,
                flex: 1,
                height: 50,
                backgroundColor: colors.btnbg,
                // marginRight: 0,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="exit-outline"
                  size={22}
                  color={colors.btntext}
                />
                <Text
                  style={{
                    fontSize: 15,
                    // fontFamily: "Roboto_medium",
                    marginLeft: 5,
                    color: colors.btntext,
                  }}
                >
                  SignUp
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomDrawer;

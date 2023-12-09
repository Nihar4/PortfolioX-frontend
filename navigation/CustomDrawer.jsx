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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action/user";
import {
  useMessageAndErrorProfile,
  useMessageAndErrorUser,
} from "../utils/hooks";

const CustomDrawer = (props) => {
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(props.navigation, dispatch, "Home1");

  const drawerItems = [{ label: "Home", icon: "home", screenName: "Home1" }];

  // Conditionally add "Portfolio" and "WatchList" options if the user is authenticated
  if (isAuthenticated) {
    drawerItems.push(
      { label: "Portfolio", icon: "wallet-sharp", screenName: "Portfolio1" },
      { label: "WatchList", icon: "heart-sharp", screenName: "Watchlist1" }
    );
  }

  // Add "About Us" and "Contact Us" options
  drawerItems.push(
    { label: "About Us", icon: "information-circle", screenName: "AboutUs1" },
    { label: "Contact Us", icon: "ios-mail", screenName: "ContactUs1" }
  );

  const handleLogin = () => {
    props.navigation.navigate("Login1", {
      screen: "Login",
    });
  };

  const handleSignUp = () => {
    props.navigation.navigate("Register1", {
      screen: "Register",
    });
  };

  const handleSignOut = () => {
    dispatch(logout());
  };

  const handleProfile = () => {
    props.navigation.navigate("Profile1");
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
          {user && !loading ? (
            <Image
              source={{ uri: user.avatar.url }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
          ) : (
            <Image
              source={require("../assets/avtar.jpeg")}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
          )}

          {user && !loading ? (
            <Text
              style={{
                color: colors.inputtext,
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
          ) : (
            <></>
          )}
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
        {isAuthenticated && (
          <TouchableOpacity
            onPress={handleProfile}
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
              <Ionicons
                name="person-circle-outline"
                size={22}
                color={colors.btntext}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 5,
                  color: colors.btntext,
                }}
              >
                Profile
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {isAuthenticated ? (
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              paddingVertical: 15,
              width: 150,
              marginTop: 10,
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
              }}
            >
              {" "}
              OR{" "}
            </Text>
            <TouchableOpacity
              onPress={handleSignUp}
              style={{
                paddingHorizontal: 12,
                flex: 1,
                height: 50,
                backgroundColor: colors.btnbg,
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

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from "./CustomDrawer";

import Ionicons from "react-native-vector-icons/Ionicons";

import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile";
import AboutUs from "../screens/AboutUs";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgotPassword from "../screens/ForgotPassword";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chart from "../screens/Chart";
import { HeaderBackButton } from "@react-navigation/elements";
import CustomHeader from "./CustomHeader";
import CustomHeaderLogin from "./CustomHeaderLogin";

const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// const HomeStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="Home"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="forgotpassword" component={ForgotPassword} />
//       <Stack.Screen name="Register" component={Register} />
//     </Stack.Navigator>
//   );
// };
const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        // headerShown: false,
        header: (props) => <CustomHeader {...props} />,
        drawerActiveBackgroundColor: "#aa18ea",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "Roboto-Medium",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Chart"
        component={Chart}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="forgotpassword"
        component={ForgotPassword}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthStack;

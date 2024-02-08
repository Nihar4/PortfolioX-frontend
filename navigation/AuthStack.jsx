import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import CustomDrawer from "./CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import AboutUs from "../screens/AboutUs/AboutUs";
import Home from "../screens/Home/Home";
import Register from "../screens/Auth/Register";
import Login from "../screens/Auth/Login";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import Chart from "../screens/Home/Chart";
import CustomHeader from "./CustomHeader";
import CustomHeaderLogin from "./CustomHeaderLogin";
import StockDetail from "../screens/Home/StockDetail";
import Search from "../screens/Layout/Search";
import ContactUs from "../screens/ContactUs/ContactUs";
import Portfolio from "../screens/Portfolio/Portfolio";
import { useSelector } from "react-redux";
import Profile from "../screens/Profile/Profile";
import Verify from "../screens/Auth/Verify";
import WatchList from "../screens/WatchList/WatchList";
import Subscribe from "../screens/Payment/Subscribe";
import PaymentSuccess from "../screens/Payment/PaymentSuccess";
import History from "../screens/Portfolio/History";
import Sell from "../screens/Payment/Sell";
import SellSuccess from "../screens/Payment/SellSuccess";
import ChangePassword from "../screens/Profile/ChangePassword";
import UpdateProfile from "../screens/Profile/UpdateProfile";
import Reports from "../screens/Profile/Reports";
import OrderHistory from "../screens/Profile/OrderHistory";
import Help from "../screens/Profile/Help";
import DisplayMore from "../screens/Home/DisplayMore";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="DisplayMore"
        component={DisplayMore}
        options={{
          header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="Chart"
        component={Chart}
        options={{
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="StockDetail"
        component={StockDetail}
        options={{
          headerShown: false,
          // header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="Subscribe"
        component={Subscribe}
        options={{
          headerShown: false,
          // header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="Sell"
        component={Sell}
        options={{
          headerShown: false,
          // header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccess}
        options={{
          headerShown: false,
          // header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="SellSuccess"
        component={SellSuccess}
        options={{
          headerShown: false,
          // header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          // header: CustomHeader,
        }}
      />
    </Stack.Navigator>
  );
}

function PortfolioStack() {
  return (
    <Stack.Navigator initialRouteName="Portfolio">
      <Stack.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          // headerShown: false,
          header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          // headerShown: false,
          header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          // header: CustomHeader,
        }}
      />
    </Stack.Navigator>
  );
}

function WatchlistStack() {
  return (
    <Stack.Navigator initialRouteName="Watchlist">
      <Stack.Screen
        name="Watchlist"
        component={WatchList}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="StockDetail"
        component={StockDetail}
        options={{
          headerShown: false,
          // header: CustomHeader,
        }}
      />
      {/* Add other screens within this stack */}
    </Stack.Navigator>
  );
}

function ContactUsStack() {
  return (
    <Stack.Navigator initialRouteName="ContactUs">
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      {/* Add other screens within this stack */}
    </Stack.Navigator>
  );
}

function AboutUsStack() {
  return (
    <Stack.Navigator initialRouteName="AboutUs">
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      {/* Add other screens within this stack */}
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="changepassword"
        component={ChangePassword}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="updateprofile"
        component={UpdateProfile}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="orderhistory"
        component={OrderHistory}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="reports"
        component={Reports}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="help"
        component={Help}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="Home1"
        component={HomeStack}
        options={{
          headerShown: false,
          // header: CustomHeader,
        }}
      />
    </Stack.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: CustomHeaderLogin,
      }}
    >
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="forgotpassword"
        component={ForgotPassword}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="Profile1"
        component={ProfileStack}
        options={{
          headerShown: false,
          // header: CustomHeaderLogin,
        }}
      />
    </Stack.Navigator>
  );
}

function RegisterStack() {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        header: CustomHeaderLogin,
      }}
    >
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="forgotpassword"
        component={ForgotPassword}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          // headerShown: false,
          header: CustomHeaderLogin,
        }}
      />
      <Stack.Screen
        name="Profile1"
        component={ProfileStack}
        options={{
          headerShown: false,
          // header: CustomHeaderLogin,
        }}
      />
    </Stack.Navigator>
  );
}

const AuthStack = () => {
  const { loading, message, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  return (
    <Drawer.Navigator
      // initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        // header: (props) => <CustomHeader {...props} />,
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
      <Drawer.Screen name="Home1" component={HomeStack} />
      <Drawer.Screen name="Portfolio1" component={PortfolioStack} />
      <Drawer.Screen name="Watchlist1" component={WatchlistStack} />
      <Drawer.Screen name="ContactUs1" component={ContactUsStack} />
      <Drawer.Screen name="AboutUs1" component={AboutUsStack} />
      <Drawer.Screen name="Profile1" component={ProfileStack} />
      <Drawer.Screen name="Login1" component={LoginStack} />
      <Drawer.Screen name="Register1" component={RegisterStack} />

      {/* <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Verify"
        component={Verify}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}

      {/* <Drawer.Screen
        name="Chart"
        component={Chart}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="StockDetail"
        component={StockDetail}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="forgotpassword"
        component={ForgotPassword}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="WatchList"
        component={WatchList}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
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
      /> */}
      {/* <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Subscribe"
        component={Subscribe}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sell"
        component={Sell}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="PaymentSuccess"
        component={PaymentSuccess}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SellSuccess"
        component={SellSuccess}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="changepassword"
        component={ChangePassword}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="updateprofile"
        component={UpdateProfile}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default AuthStack;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "./screens/Home";
// import Login from "./screens/Login";
// import Register from "./screens/Register";
// import ForgotPassword from "./screens/ForgotPassword";
// // import Header from "./screens/Header";
// import DrawerNavigator from "./navigation/AuthStack";
import AuthStack from "./navigation/AuthStack";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <Header /> */}
      {/* Display the Header component outside the stack navigator */}
      {/* <DrawerNavigator /> */}
      {/* <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
      >
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="forgotpassword" component={ForgotPassword} />
        </Stack.Group>
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default Main;

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import Home from "./screens/Home";
// import AboutUs from "./screens/AboutUs";
// import ContactUs from "./screens/ContactUs";
// import Profile from "./screens/Profile";
// import Login from "./screens/Login";
// import Register from "./screens/Register";
// import ForgotPassword from "./screens/ForgotPassword";

// const Drawer = createDrawerNavigator();

// const Main = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         initialRouteName="Login"
//         screenOptions={{
//           headerShown: false, // Hide the header for all screens
//         }}
//       >
//         <Drawer.Screen name="Home" component={Home} />
//         <Drawer.Screen name="AboutUs" component={AboutUs} />
//         <Drawer.Screen name="ContactUs" component={ContactUs} />
//         <Drawer.Screen name="Profile" component={Profile} />
//         <Drawer.Screen name="Login" component={Login} />
//         <Drawer.Screen name="Register" component={Register} />
//         <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Main;

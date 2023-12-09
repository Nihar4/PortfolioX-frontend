import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUser } from "./redux/action/user";
import Toast from "react-native-toast-message";
import Loader from "./screens/Layout/Loader";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AuthStack />
      <Toast position="bottom" />
    </NavigationContainer>
  );
};

export default Main;

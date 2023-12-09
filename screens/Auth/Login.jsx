import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors, defaultStyle } from "../../styles/style";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/user";
import { useMessageAndErrorUser } from "../../utils/hooks";

const Login = ({ navigation }) => {
  // const loading = false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, dispatch, "Profile1");

  const submitHandler = () => {
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  };
  return (
    <View style={[styles.container, defaultStyle]}>
      <Text style={styles.logo}>Welcome to PortFolioX</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button
        loading={loading}
        textColor={colors.btntext}
        disabled={email === "" || password === ""}
        onPress={submitHandler}
        style={styles.loginButton}
      >
        Login
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("forgotpassword")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register1")}>
          <Text style={styles.signupTextColor}>Sign Up </Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>here </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: colors.text,
    marginBottom: 70,
    // fontFamily: "Roboto_medium",
  },
  inputView: {
    width: "80%",
    backgroundColor: colors.inputbg,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: colors.inputtext,
    // fontFamily: "Roboto_medium",
  },
  forgotPassword: {
    color: colors.inputtext,
    fontSize: 11,
    padding: 10,
  },
  loginButton: {
    width: "40%",
    backgroundColor: colors.btnbg,
    borderRadius: 25,
    padding: 6,
    marginTop: 10,
    marginBottom: 10,
    // fontFamily: "Roboto_medium",
  },
  loginText: {
    color: colors.btntext,
    // fontFamily: "Roboto_medium",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: colors.inputtext,
    fontSize: 12,
    // fontFamily: "Roboto_medium",
  },
  signupTextColor: {
    color: colors.btnbg,
    fontSize: 12,
  },
});

export default Login;

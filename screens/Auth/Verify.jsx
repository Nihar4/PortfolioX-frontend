import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useMessageAndErrorProfile } from "../../utils/hooks";
import { colors, defaultStyle } from "../../styles/style"; // Import the dark theme styles here
import { resetPassword } from "../../redux/action/profile";

const Verify = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loading = useMessageAndErrorProfile(navigation, dispatch, "Login");

  const submitHandler = () => {
    dispatch(resetPassword(otp, password));
  };

  return (
    <View style={[styles.container, defaultStyle]}>
      <Text style={styles.logo}>Reset Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="OTP"
          placeholderTextColor="#A0A0A0"
          value={otp}
          onChangeText={setOtp}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="New Password"
          secureTextEntry={true}
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        loading={loading}
        textColor={colors.btntext}
        mode="contained"
        disabled={otp === "" || password === ""}
        onPress={submitHandler}
        style={styles.loginButton}
      >
        Reset
      </Button>
      <Text style={styles.or}>OR</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("forgotpassword")}
      >
        <Text style={styles.link}>Resend OTP</Text>
      </TouchableOpacity>
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
  },
  inputView: {
    width: "80%",
    backgroundColor: colors.inputbg,
    borderRadius: 25,
    height: 50,
    marginBottom: 25,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: colors.inputtext,
  },
  loginButton: {
    width: "70%",
    backgroundColor: colors.btnbg,
    borderRadius: 25,
    padding: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  or: {
    color: colors.inputtext, // Use the dark theme input text color
    fontSize: 14,
    marginTop: 10,
  },
  link: {
    color: colors.btnbg, // Use the dark theme button background color
    fontSize: 14,
    marginTop: 10,
  },
});

export default Verify;

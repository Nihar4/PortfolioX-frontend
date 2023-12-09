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
import { useMessageAndErrorOther } from "../../utils/hooks";
import { contactUs } from "../../redux/action/profile";

const ContactUs = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const loading = useMessageAndErrorOther(navigation, dispatch, null);
  const submitHandler = () => {
    // Your contact form submission logic here
    dispatch(contactUs(name, email, message));
  };

  return (
    <View style={[styles.container, defaultStyle]}>
      <Text style={styles.logo}>CONTACT US</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#A0A0A0"
          value={name}
          onChangeText={setName}
        />
      </View>
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
          placeholder="Message"
          placeholderTextColor="#A0A0A0"
          value={message}
          onChangeText={setMessage}
        />
      </View>

      <Button
        loading={loading}
        textColor={colors.btntext}
        disabled={email === "" || message === "" || name === ""}
        onPress={submitHandler}
        style={styles.loginButton}
      >
        Send Message
      </Button>
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
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: colors.inputtext,
  },
  forgotPassword: {
    color: colors.inputtext,
    fontSize: 11,
    padding: 10,
  },
  loginButton: {
    width: "70%",
    backgroundColor: colors.btnbg,
    borderRadius: 25,
    padding: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: colors.btntext,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: colors.inputtext,
    fontSize: 12,
  },
  signupTextColor: {
    color: colors.btnbg,
    fontSize: 12,
  },
  // Add any additional styles needed for your specific design
});

export default ContactUs;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { colors, defaultStyle } from "../styles/style";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const Register = ({ navigation }) => {
  const loading = false;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const submitHandler = (e) => {
    // Dispatch registration logic here
    console.log(name, email, password, avatar);
  };

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };
  return (
    <View style={[styles.container, defaultStyle]}>
      <Text style={styles.logo}>REGISTRATION</Text>
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
      <TouchableOpacity onPress={pickAvatar}>
        <Text style={styles.avatarText}>Pick Avatar</Text>
      </TouchableOpacity>

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
        disabled={
          name === "" || email === "" || password === "" || avatar === ""
        }
        onPress={submitHandler}
        style={styles.loginButton}
      >
        Sign Up
      </Button>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already Signed Up? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupTextColor}>Login </Text>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    // fontFamily: "Roboto_medium",
  },
  avatarText: {
    color: colors.Primary,
    fontSize: 16,
    marginBottom: 20,
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
    // fontFamily: "Roboto_medium",
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
    // fontFamily: "Roboto_medium",
  },
});

export default Register;

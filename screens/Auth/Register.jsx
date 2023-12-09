import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { colors, defaultStyle } from "../../styles/style";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/action/user"; // Ensure you have the correct import path
import mime from "mime";
import { useMessageAndErrorUser } from "../../utils/hooks";

const Register = ({ navigation }) => {
  // const loading = false;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);

    if (avatar !== "") {
      // Append the avatar as a file to the FormData
      myForm.append("file", {
        uri: avatar,
        type: mime.getType(avatar), // Use the 'mime' library to get the correct content type
        name: avatar.split("/").pop(),
      });
    }

    // Dispatch the register action with the FormData
    dispatch(register(myForm));
    setEmail("");
    setPassword("");
    setPassword("");
    setAvatar("");
  };

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Change "cancelled" to "canceled"
      if (result.assets && result.assets.length > 0) {
        // Access selected assets through the "assets" array
        setAvatar(result.assets[0].uri); // Use the uri property of the first asset
      }
    }
  };
  const loading = useMessageAndErrorUser(navigation, dispatch, "Profile1");
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
        <TouchableOpacity onPress={() => navigation.navigate("Login1")}>
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
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  avatarText: {
    color: colors.Primary,
    fontSize: 16,
    marginBottom: 20,
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
  loginButton: {
    width: "40%",
    backgroundColor: colors.btnbg,
    borderRadius: 25,
    padding: 6,
    marginTop: 10,
    marginBottom: 10,
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
});

export default Register;

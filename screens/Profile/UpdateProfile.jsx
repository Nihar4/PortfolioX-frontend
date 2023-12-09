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
import {
  useMessageAndErrorOther,
  useMessageAndErrorProfile,
} from "../../utils/hooks";
import {
  changePassword,
  contactUs,
  updateProfile,
} from "../../redux/action/profile";
import { loadUser } from "../../redux/action/user";

const UpdateProfile = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const dispatch = useDispatch();
  const loading = useMessageAndErrorProfile(navigation, dispatch, "Profile");
  const submitHandler = async () => {
    await dispatch(updateProfile(name, email));
    // await dispatch(loadUser());
  };

  return (
    <View style={[styles.container, defaultStyle]}>
      <Text style={styles.logo}>UPDATE PROFILE</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#A0A0A0"
          value={name}
          onChangeText={setname}
        />
      </View>
      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setemail}
        />
      </View> */}
      <Button
        loading={loading}
        textColor={colors.btntext}
        disabled={name === ""}
        onPress={submitHandler}
        style={styles.loginButton}
      >
        Change
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

export default UpdateProfile;

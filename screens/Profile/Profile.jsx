import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../../redux/action/user";
import { updateProfilePicture } from "../../redux/action/profile";
import { colors } from "../../styles/style";
import {
  useMessageAndErrorProfile,
  useMessageAndErrorUser,
} from "../../utils/hooks";
import Loader from "../Layout/Loader";
import { FontAwesome, MaterialIcons, Entypo } from "react-native-vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const Profile = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarprev, setAvatarpre] = useState("");
  const { loading, message, error, user } = useSelector((state) => state.user);
  const loading1 = useMessageAndErrorProfile(navigation, dispatch, null);

  useEffect(() => {
    setIsOpen(false);
    setAvatarpre("");
    setAvatar("");
    // Load user data and handle toast messages here.
  }, []);

  const changeImageSubmitHandler = async () => {
    const myForm = new FormData();
    if (avatar !== "") {
      // Append the avatar as a file to the FormData
      myForm.append("file", {
        uri: avatar,
        type: mime.getType(avatar), // Use the 'mime' library to get the correct content type
        name: avatar.split("/").pop(),
      });
      await dispatch(updateProfilePicture(myForm));
      await dispatch(loadUser());
    }
    setIsOpen(false);
  };

  const UpdateProfileHandler = () => {
    navigation.navigate("updateprofile");
  };
  const ChangePasswordHandler = () => {
    navigation.navigate("changepassword");
  };

  const closeHandler = () => {
    setIsOpen(false);
    setAvatarpre("");
  };

  const openHandler = () => {
    setIsOpen(true);
    setAvatarpre("");
  };
  const handleOrderHistory = () => {
    // Navigate to the Order History screen
    navigation.navigate("orderhistory");
  };

  const handleReports = () => {
    // Navigate to the Reports screen
    navigation.navigate("reports");
  };

  const handleCustomerCare = () => {
    // Navigate to the Customer Care screen
    navigation.navigate("help");
  };

  const handleLogOut = async () => {
    await dispatch1(logout());
    // const loading2 = useMessageAndErrorUser(navigation, dispatch1, "Home");
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
        setAvatar(result.assets[0].uri);
        setAvatarpre(result.assets[0].uri); // Use the uri property of the first asset
      }
    }
  };

  return !user || loading ? (
    <Loader />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Profile</Text>
          <View style={styles.imageContainer}>
            <Image style={styles.avatar} source={{ uri: user.avatar.url }} />
            {/* {user && !loading ? (
            <Image source={{ uri: user.avatar.url }} style={styles.avatar} />
          ) : (
            <Image
              source={require("../../assets/avtar.jpeg")}
              style={styles.avatar}
            />
          )} */}
            <IconButton
              icon="pencil"
              color={colors.btntext}
              style={styles.editIcon}
              size={20}
              onPress={openHandler}
            />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          {/* <View style={styles.btnContainer}>
            <Button
              loading={loading}
              textColor={colors.btntext}
              onPress={UpdateProfileHandler}
              style={styles.btn}
            >
              Update Profile
            </Button>
            <Button
              loading={loading}
              textColor={colors.btntext}
              onPress={ChangePasswordHandler}
              style={styles.btn}
            >
              Change Password
            </Button>
          </View> */}

          <View style={styles.extra}>
            <TouchableOpacity
              style={styles.option}
              onPress={UpdateProfileHandler}
            >
              <FontAwesome name="edit" size={32} color={colors.btnbg} />
              <Text style={styles.optionText}>Update Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={ChangePasswordHandler}
            >
              <FontAwesome name="key" size={32} color={colors.btnbg} />
              <Text style={styles.optionText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={handleOrderHistory}
            >
              <FontAwesome name="history" size={32} color={colors.btnbg} />
              <Text style={styles.optionText}>Order History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handleReports}>
              <MaterialIcons
                name="description"
                size={32}
                color={colors.btnbg}
              />
              <Text style={styles.optionText}>Reports</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.option}
              onPress={handleCustomerCare}
            >
              <Entypo name="phone" size={32} color={colors.btnbg} />
              <Text style={styles.optionText}>Customer Care</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.option} onPress={handleLogOut}>
              <FontAwesome name="sign-out" size={32} color={colors.btnbg} />
              <Text style={styles.optionText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Modal
            visible={isOpen}
            animationType="slide"
            transparent={true}
            onRequestClose={closeHandler}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Change Photo</Text>
                {avatarprev && (
                  <Image
                    source={{ uri: avatarprev }}
                    style={styles.modalAvatar}
                  />
                )}
                <View style={styles.buttonContainer}>
                  <Button
                    loading={loading1}
                    textColor={colors.btntext}
                    onPress={pickAvatar}
                    style={styles.btn}
                  >
                    Choose File
                  </Button>
                  <Button
                    loading={loading1}
                    textColor={colors.btntext}
                    onPress={changeImageSubmitHandler}
                    style={styles.btn}
                  >
                    Change
                  </Button>
                </View>
                <Button
                  loading={loading1}
                  textColor={colors.btntext}
                  onPress={closeHandler}
                  style={[styles.CancelContainer]}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
    minHeight: Dimensions.get("window").height,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  imageContainer: {
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 80,
    marginTop: 20,
  },
  editIcon: {
    position: "absolute",
    bottom: -10,
    right: 110,
    backgroundColor: colors.btnbg,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 25,
    textAlign: "center",
  },
  email: {
    marginTop: 8,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    width: 300,
    height: 400,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
    textAlign: "center",
  },
  modalAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignSelf: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  CancelContainer: {
    alignItems: "center",
    marginTop: 20,
    position: "absolute",
    bottom: 10,
    right: 10,
    width: "45%",
    backgroundColor: "#EDF2F7",
    borderRadius: 10,
    padding: 6,
  },
  btn: {
    width: "70%",
    backgroundColor: colors.btnbg,
    borderRadius: 25,
    padding: 6,
    marginTop: 20,
  },
  btnContainer: {
    margin: 20,
    alignItems: "center",
    padding: 10,
  },
  extra: {
    marginTop: 20,
    padding: 5,
    borderTopWidth: 0.2,
    borderTopColor: "#C0C0C0",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    // borderTopWidth: 0.2,
    // borderTopColor: "#C0C0C0",
  },
  optionText: {
    color: "white",
    fontSize: 16,
    marginLeft: 15,
  },
});

export default Profile;

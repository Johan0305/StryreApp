import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import userImage from "../assets/icons/userBig.png";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/reducers/User.reducer";
import axios from "axios";

const Profile = ({ route, navigation }) => {
  const { name } = route.params;
  const { user } = useSelector((state) => state.UserReducer);
  const [selectedImage, setSelectedImage] = useState(user.picture);
  const [updateImg, setUpdateImg] = useState();
  const [names, setNames] = useState(user.name);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(updateImg);
    dispatch(updateUser({ ...user, name: names, picture: updateImg }));
    navigation.navigate("Dashboard");
  };

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);

      let base64Img = `data:image/jpg;base64,${result.base64}`;

      //Add your cloud name
      let apiUrl = "https://api.cloudinary.com/v1_1/styreapp/image/upload";

      let data = {
        file: base64Img,
        upload_preset: "styreimgs",
      };

      const imgUp = await axios.post(apiUrl, JSON.stringify(data), {
        headers: {
          "content-type": "application/json",
        },
      });

      setUpdateImg(imgUp.data.url);
      console.log(imgUp.data.url, selectedImage);
    }
  };

  const closesession = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (err) {
      return alert("Ha ocurrido un error");
    }
  };

  console.log(user, updateImg);
  return (
    <ScrollView contentContainerStyle={styles.containerGlobal}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={false}
        style={styles.containerGlobal}
      >
        <View style={styles.containerInfo}>
          <View style={styles.containerImg}>
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor="#b3b1b1"
              style={{ borderRadius: 100, height: "73.69%", width: "65.81%" }}
              onPress={() => openImagePickerAsync()}
            >
              <Image
                source={
                  selectedImage !== "nothing"
                    ? { uri: selectedImage }
                    : userImage
                }
                style={{ height: "100%", width: "100%", borderRadius: 100 }}
              />
            </TouchableHighlight>
            <Text style={styles.textTop}>Toca para editar tu foto</Text>
          </View>
          <View style={styles.containerForm}>
            <View style={styles.containerInputs}>
              <View
                style={{ height: "42.17%", justifyContent: "space-between" }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "rgba(16, 40, 64, 1)",
                    fontWeight: "700",
                  }}
                >
                  Nombre
                </Text>
                <TextInput
                  placeholder="Nombre"
                  style={styles.input}
                  placeholderTextColor={"#102840"}
                  value={names}
                  onChangeText={(text) => setNames(text)}
                />
              </View>
              <View
                style={{ height: "42.17%", justifyContent: "space-between" }}
              ></View>
            </View>
            <View style={styles.containerButtons}>
              <View
                style={{ width: "100%", height: "28.8%", alignItems: "center" }}
              >
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#FFECA1"
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.textButton}>Actualizar</Text>
                </TouchableHighlight>
              </View>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="transparent"
                style={{ height: "33.6%" }}
                onPress={() => closesession()}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "400",
                    textAlign: "center",
                    color: "rgba(88, 88, 88, 1)",
                  }}
                >
                  Cerrar sesión
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerGlobal: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerInfo: {
    width: "68.465%",
    height: "73.46%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerImg: {
    width: "87.65%",
    height: "33.708%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerForm: {
    width: "100%",
    height: "60.808%",
    justifyContent: "space-between",
  },
  containerInputs: {
    width: "100%",
    height: "44.034%",
    justifyContent: "space-between",
  },
  containerButtons: {
    width: "100%",
    height: "33.16%",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    height: "51.45%",
    backgroundColor: "transparent",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  textTop: {
    height: "17.23%",
    width: "100%",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    color: "rgba(16, 40, 64, 0.9)",
  },
  button: {
    backgroundColor: "#D3C27F",
    borderRadius: 20,
    height: "100%",
    width: "87.645%",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textButton: {
    fontSize: 21,
    textAlign: "center",
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "400",
  },
});
export default Profile;

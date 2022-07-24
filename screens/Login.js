import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import LogoK from "../assets/LogoK.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/reducers/User.reducer";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {});
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView
        behavior="height"
        enabled={false}
        style={{
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>Inicia sesión</Text>

          <TextInput
            placeholder="Correo Electrónico"
            style={styles.input}
            autoComplete={"email"}
            placeholderTextColor={"#102840"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Código"
            style={[styles.input]}
            maxLength={4}
            keyboardType="numeric"
            placeholderTextColor={"#102840"}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="transparent"
            onPress={() => console.log("holaaa")}
            style={{ width: "100%", marginBottom: "-5%", marginTop: "-5%" }}
          >
            <Text style={styles.textA}>{""}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#FFECA1"
            style={styles.button}
            onPress={() =>
              dispatch(loginUser(email.toLowerCase(), password, navigation))
            }
          >
            <Text style={styles.textButton}>Continuar</Text>
          </TouchableHighlight>

          <Image
            source={LogoK}
            style={{
              width: "52.15%",
              height: "32%",
              left: "5%",
              marginBottom: -70,
              marginTop: -50,
            }}
          />

          <Text style={styles.textFooter}>¿Primera vez en StyreApp?</Text>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#FFECA1"
            style={[styles.button, { backgroundColor: "#EBE9E6" }]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.textButton}>Registrate</Text>
          </TouchableHighlight>
          <Text style={[styles.textButton, { fontSize: 16, color: "#585858" }]}>
            Salir
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "71.55%",
    height: "100%",
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#102840",
    fontSize: 40,
  },
  input: {
    width: "100%",
    height: "4.62%",
    backgroundColor: "transparent",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  button: {
    backgroundColor: "#FFE16B",
    borderRadius: 20,
    height: "4.62%",
    width: "85%",
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
    fontSize: 20,
    textAlign: "center",
    color: "#102840",
    fontWeight: "500",
  },

  textA: {
    fontSize: 15.5,
    textAlign: "right",
    color: "#535353",
  },
  textFooter: {
    color: "#102840",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Login;

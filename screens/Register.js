import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
  View,
  TouchableHighlight,
} from "react-native";

const Register = () => {
  return (
    <View
      style={{
        alignItems: "center",
        height: "100%",
        justifyContent: "space-around",
        backgroundColor: "white",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Registro</Text>

        <TextInput
          placeholder="Nombre"
          style={[styles.input, { marginBottom: "-4%" }]}
          placeholderTextColor={"#102840"}
        />
        <TextInput
          placeholder="Correo Electrónico"
          style={styles.input}
          autoComplete={"email"}
          placeholderTextColor={"#102840"}
        />
        <Text style={styles.textA}>
          Por tu seguridad y la de nuestra comunidad, tu codigo debe contener 4
          numeros.
        </Text>
        <TextInput
          placeholder="Código"
          style={[styles.input, { marginBottom: "4%" }]}
          maxLength={4}
          keyboardType="numeric"
          placeholderTextColor={"#102840"}
          secureTextEntry={true}
        />
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#FFECA1"
          style={styles.button}
          onPress={() => console.log("holaaa")}
        >
          <Text style={styles.textButton}>Continuar</Text>
        </TouchableHighlight>
      </View>
      <View style={{ width: "71.55%", alignItems: "center" }}>
        <Text style={styles.textFooter}>
          Con nuestras{" "}
          {<Text style={{ fontWeight: "bold" }}>políticas de seguridad</Text>}{" "}
          tus datos personales serán salvaguardados en la base de datos de
          Styreapp.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "71.55%",
    height: "57.5%",
    alignItems: "center",
    justifyContent: "space-evenly",
    top: "-7%",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#102840",
    fontSize: 40,
  },
  input: {
    width: "100%",
    height: "8.25%",
    backgroundColor: "transparent",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  button: {
    backgroundColor: "#FFE16B",
    borderRadius: 20,
    height: "8.03%",
    width: "85%",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
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
    fontSize: 13.2,
    textAlign: "justify",
    color: "#535353",
  },
  textFooter: {
    color: "#102840",
    fontSize: 14,
    textAlign: "center",
  },
});

export default Register;

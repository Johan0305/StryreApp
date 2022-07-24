import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import "intl";
import "intl/locale-data/jsonp/en";
import { useDispatch, useSelector } from "react-redux";
import { createWallet } from "../../store/reducers/Wallet.reducer";

const ModalDashboard = ({ modalFunc }) => {
  const [buttonColor, setButtonColor] = useState("rgba(217, 217, 217, 1)");
  const [name, setName] = useState("");
  const [mount, setMount] = useState("");
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const finalMount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(mount);

  return (
    <View style={styles.containerBackground}>
      <View style={styles.containerModal}>
        <View style={styles.containerInfo}>
          <View
            style={{
              height: "27.07%",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View style={styles.textTop}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Nuevo Wallet
              </Text>
            </View>
            <View
              style={[
                styles.textTop,
                {
                  height: "65.89%",
                  justifyContent: "flex-start",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "300",
                  textAlign: "center",
                }}
              >
                Diseña tu nuevo wallet para un mejor orden de tus cuentas y
                metodos de pago
              </Text>
            </View>
          </View>
          <View style={styles.containerForm}>
            <TextInput
              placeholder="Nombre de Wallet"
              style={styles.input}
              placeholderTextColor={"rgba(16, 40, 64, 0.9)"}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholder="Balance"
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor={"rgba(16, 40, 64, 0.9)"}
              value={finalMount === "$0" ? "" : finalMount}
              onChangeText={(text) => {
                setMount(
                  Number(
                    text
                      .split("")
                      .filter((item) => /\d/.test(item) === true)
                      .join("")
                  )
                );
              }}
            />
          </View>
          <View style={styles.containerColor}>
            <Text style={[styles.input, { borderBottomWidth: 0 }]}>Color</Text>
            <View
              style={{
                flexDirection: "row",
                height: 47,
                justifyContent: "space-evenly",
              }}
            >
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="rgba(187, 165, 79, 0.8)"
                style={[
                  styles.buttonColor,
                  { backgroundColor: "rgba(187, 165, 79, 1)" },
                ]}
                onPress={() => setButtonColor("rgba(187, 165, 79, 1)")}
              >
                <Text>{""}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="rgba(223, 103, 103, 0.8)"
                style={[
                  styles.buttonColor,
                  { backgroundColor: "rgba(223, 103, 103, 1)" },
                ]}
                onPress={() => setButtonColor("rgba(223, 103, 103, 1)")}
              >
                <Text>{""}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="rgba(132, 106, 157, 0.8)"
                style={[
                  styles.buttonColor,
                  { backgroundColor: "rgba(132, 106, 157, 1)" },
                ]}
                onPress={() => setButtonColor("rgba(132, 106, 157, 1)")}
              >
                <Text>{""}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="rgba(91, 148, 189, 0.8)"
                style={[
                  styles.buttonColor,
                  { backgroundColor: "rgba(91, 148, 189, 1)" },
                ]}
                onPress={() => setButtonColor("rgba(91, 148, 189, 1)")}
              >
                <Text>{""}</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.containerConfirm}>
            <View style={{ height: "54.84%", justifyContent: "space-between" }}>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: "43.16%",
                }}
              >
                <TouchableHighlight
                  activeOpacity={0.8}
                  underlayColor={buttonColor}
                  style={[styles.button, { backgroundColor: buttonColor }]}
                  onPress={() =>
                    dispatch(
                      createWallet(name, mount, buttonColor, modalFunc, user)
                    )
                  }
                >
                  <Text
                    style={{
                      fontSize: 21,
                      fontWeight: "400",
                      textAlign: "center",
                      color: "#ffff",
                    }}
                  >
                    Continuar
                  </Text>
                </TouchableHighlight>
              </View>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="transparent"
                style={{ height: "34.32%" }}
                onPress={() => modalFunc(false)}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
                  Salir
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(217, 217, 217, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  containerModal: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 255,
    width: "91.8%",
    minHeight: 600,
    height: "86.85%",
    backgroundColor: "#ffff",
    borderRadius: 20,
  },
  containerInfo: {
    width: "77.66%",
    minHeight: 515,
    height: "85.96%",
  },
  textTop: {
    height: "28.25%",
    width: "100%",
    justifyContent: "center",
  },
  containerForm: {
    width: "100%",
    height: "18.47%",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    height: "31.04%",
    backgroundColor: "transparent",
    fontSize: 18,
    fontWeight: "400",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    color: "rgba(16, 40, 64, 0.9)",
  },
  containerColor: {
    width: "100%",
    justifyContent: "flex-end",
    height: "20.221%",
  },
  buttonColor: {
    borderRadius: 200,
    width: 47,
    height: 47,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerConfirm: {
    width: "100%",
    height: "29.615%",
    justifyContent: "flex-end",
  },
  button: {
    borderRadius: 20,
    height: "100%",
    width: "84.415%",
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
});

export default ModalDashboard;

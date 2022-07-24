import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import ModalStructure from "../ModalStructure";
import "intl";
import "intl/locale-data/jsonp/en";
import { useDispatch, useSelector } from "react-redux";
import { updateWallet } from "../../store/reducers/Wallet.reducer";
import { USER_UPDATE } from "../../store/reducers/User.reducer";

const ModalAdd = ({ modalFunc, wallet }) => {
  const [mount, setMount] = useState("");
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const num = 1244535654;

  const finalMount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(mount);

  return (
    <ModalStructure>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={false}
        style={{ alignItems: "center", width: "100%" }}
      >
        <View style={styles.container}>
          <View style={styles.containerText}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Sumale a tu Wallet
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Añade dinero a tu wallet desde aquí o puedes ir a la página
              principal y le das en el signo “+”
            </Text>
          </View>
          <View style={styles.containerForm}>
            <TextInput
              placeholder="Cantidad"
              style={styles.input}
              maxLength={23}
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
            <View style={{ height: "54.84%", justifyContent: "space-between" }}>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: "43.16%",
                }}
              >
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="rgba(217, 217, 217, 1)"
                  style={[
                    styles.button,
                    mount === ""
                      ? { backgroundColor: "rgba(217, 217, 217, 1)" }
                      : { backgroundColor: "rgba(211, 194, 127, 1)" },
                  ]}
                  onPress={() => {
                    dispatch(
                      updateWallet(wallet, {
                        ...wallet,
                        income: wallet.income + mount,
                      })
                    );
                    dispatch({
                      type: USER_UPDATE,
                      payload: { totalAmount: user.totalAmount + mount },
                    });
                    modalFunc(false);
                  }}
                  disabled={mount === "" ? true : false}
                >
                  <Text
                    style={{
                      fontSize: 21,
                      fontWeight: "400",
                      textAlign: "center",
                      color: "#ffff",
                    }}
                  >
                    Añadir
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
      </KeyboardAvoidingView>
    </ModalStructure>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "77.67%",
    minHeight: 329,
    justifyContent: "space-between",
  },
  containerText: {
    width: "100%",
    height: 148,
  },
  containerForm: {
    width: "100%",
    minHeight: 166,
    height: 190,
    justifyContent: "space-between",
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
  input: {
    width: "100%",
    height: 43,
    backgroundColor: "transparent",
    fontSize: 18,
    fontWeight: "400",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    color: "rgba(16, 40, 64, 0.9)",
  },
});

export default ModalAdd;

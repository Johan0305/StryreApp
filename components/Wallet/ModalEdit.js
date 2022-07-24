import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { EXPENSE_UPDATE_WALLET } from "../../store/reducers/Expense.reducer";
import { updateWallet } from "../../store/reducers/Wallet.reducer";
import ModalStructure from "../ModalStructure";

const ModalEdit = ({ modalFunc, wallet }) => {
  const [buttonColor, setButtonColor] = useState("rgba(217, 217, 217, 1)");
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  return (
    <ModalStructure>
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
                height: 49,
                width: "100%",
              }}
            >
              Edita tu wallet
            </Text>
          </View>
          <View
            style={[
              styles.textTop,
              {
                height: 103,
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
              Puedes editar el nombre de tu wallet y color de este, sin embargo,
              también tienes la opción de borrarlo
            </Text>
          </View>
        </View>
        <TextInput
          placeholder={wallet.name}
          style={styles.input}
          placeholderTextColor={"rgba(16, 40, 64, 0.9)"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
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
              <></>
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
              <></>
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
              <></>
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
              <></>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.containerForm}>
          <View style={styles.containerConfirm}>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                height: 36,
              }}
            >
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor="transparent"
                style={[styles.button, { backgroundColor: buttonColor }]}
                onPress={() => {
                  dispatch(
                    updateWallet(wallet, {
                      ...wallet,
                      color:
                        buttonColor !== "rgba(217, 217, 217, 1)"
                          ? buttonColor
                          : wallet.color,
                      name: name !== "" ? name : wallet.name,
                    })
                  );

                  modalFunc(false);
                }}
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
    </ModalStructure>
  );
};

const styles = StyleSheet.create({
  containerInfo: {
    width: 278,
    minHeight: 515,
    height: 568,
    justifyContent: "space-between",
  },
  textTop: {
    height: 49,
    width: "100%",
    justifyContent: "center",
  },
  containerForm: {
    width: "100%",
    height: 103,
  },
  input: {
    width: "100%",
    height: 37,
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
    height: 83,
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
    height: 103,
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    height: "100%",
    width: 234,
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

export default ModalEdit;

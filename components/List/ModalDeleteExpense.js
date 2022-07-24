import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../../store/reducers/Expense.reducer";
import ModalStructure from "../ModalStructure";
import MiniWallet from "./MiniWallet";

const ModalDeleteExpense = ({ modalFunc, expense }) => {
  const dispatch = useDispatch();
  let date = new Date();
  date = date.toLocaleDateString();

  const finalMount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(expense.amount);

  return (
    <ModalStructure>
      <View style={styles.containerInfo}>
        <View
          style={{
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "600",
              textAlign: "center",
              color: "rgba(187, 165, 79, 1)",
            }}
          >
            {expense.name}
          </Text>
        </View>
        <View style={styles.containerDate}>
          <Text
            style={[styles.input, { borderBottomWidth: 0, fontWeight: "600" }]}
          >
            Nombre
          </Text>
          <Text
            style={[styles.input, { borderBottomWidth: 0, paddingLeft: 10 }]}
          >
            {expense.name}
          </Text>
        </View>
        <View style={styles.containerDate}>
          <Text
            style={[styles.input, { borderBottomWidth: 0, fontWeight: "600" }]}
          >
            Monto
          </Text>
          <Text
            style={[styles.input, { borderBottomWidth: 0, paddingLeft: 10 }]}
          >
            {finalMount}
          </Text>
        </View>
        <View style={styles.containerDate}>
          <Text
            style={[styles.input, { borderBottomWidth: 0, fontWeight: "600" }]}
          >
            Fecha
          </Text>
          <Text
            style={[styles.input, { borderBottomWidth: 0, paddingLeft: 10 }]}
          >
            {expense.date}
          </Text>
        </View>
        <View style={styles.containerWallets}>
          <Text
            style={[styles.input, { borderBottomWidth: 0, fontWeight: "600" }]}
          >
            Wallet
          </Text>
          <ScrollView
            contentContainerStyle={styles.containerWallet}
            horizontal={true}
          >
            <MiniWallet
              wallet={expense.wallet}
              title={"Efectivo"}
              mount={"500.000"}
            />
          </ScrollView>
        </View>
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
              underlayColor={"blue"}
              style={[
                styles.button,
                { backgroundColor: "rgba(155, 33, 55, 1)" },
              ]}
              onPress={() => {
                dispatch(deleteExpense(expense));
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
                Eliminar
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
    </ModalStructure>
  );
};

const styles = StyleSheet.create({
  containerInfo: {
    width: 278,
    minHeight: 515,
    height: 685,
    justifyContent: "space-between",
  },
  textTop: {
    height: "28.25%",
    width: "100%",
    justifyContent: "center",
  },
  containerForm: {
    width: "100%",
    height: 120,
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
  containerWallets: { height: 112, width: "100%" },
  scrollWallets: {
    flexDirection: "column",
    width: 267,
    height: 73,
    marginLeft: 10,
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
    height: 98,
    justifyContent: "space-between",
  },
  containerDate: {
    height: 55,
    width: "100%",
    justifyContent: "space-between",
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
  containerWallet: {
    height: 75,
    width: "100%",
  },
});

export default ModalDeleteExpense;

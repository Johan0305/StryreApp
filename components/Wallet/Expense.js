import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import icon from "../../assets/icons/editar-texto.png";
import ModalDeleteExpense from "../List/ModalDeleteExpense";
import ModalExpense from "../List/ModalExpense";
const Expense = ({ expense }) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalExpense, setModalExpense] = useState(false);
  const [changeExpense, setChangeExpense] = useState(null);

  const finalMount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(expense.amount);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalExpense}
        onRequestClose={() => {
          setModalExpense(!modalExpense);
        }}
      >
        <ModalExpense modalFunc={setModalExpense} expense={changeExpense} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDelete}
        onRequestClose={() => {
          setModalDelete(!modalDelete);
        }}
      >
        <ModalDeleteExpense modalFunc={setModalDelete} expense={expense} />
      </Modal>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="transparent"
        onPress={() => setModalDelete(true)}
        onLongPress={() => {
          setChangeExpense(expense);
          setModalExpense(true);
        }}
      >
        <View style={{ marginBottom: 20, flexDirection: "row" }}>
          <View style={styles.containerGlobal1}>
            <View style={styles.containerInfo}>
              <Text style={styles.textTitle}>{expense.name}</Text>
              <Text style={styles.textInfo}>{finalMount}</Text>
            </View>
          </View>
          <View
            style={[
              styles.containerGlobal2,
              { backgroundColor: expense.wallet.color },
            ]}
          ></View>
        </View>
      </TouchableHighlight>
    </>
  );
};

export default Expense;

const styles = StyleSheet.create({
  containerGlobal1: {
    minHeight: 62,
    maxHeight: 62,
    width: "85%",
    justifyContent: "center",
    backgroundColor: "#F1F1F1",
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerGlobal2: {
    minHeight: 62,
    maxHeight: 62,
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopColor: "#f1f1f1",
    borderRightColor: "#f1f1f1",
    borderBottomColor: "#f1f1f1",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerInfo: {
    height: 52,
    justifyContent: "space-between",
    width: "90.48%",
    marginLeft: 20,
  },
  textTitle: {
    color: "#3F3F3F",
    fontSize: 20,
    fontWeight: "600",
  },
  textInfo: {
    fontSize: 16,
    fontWeight: "400",
    color: "#3F3F3F",
    marginLeft: 15,
  },
});

import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  createExpense,
  updateExpense,
} from "../../store/reducers/Expense.reducer";
import { USER_UPDATE } from "../../store/reducers/User.reducer";
import { updateWallet } from "../../store/reducers/Wallet.reducer";
import ModalStructure from "../ModalStructure";
import MiniWallet from "./MiniWallet";

const ModalExpense = ({ modalFunc, list, expense }) => {
  const { wallets } = useSelector((state) => state.WalletReducer);
  const { user } = useSelector((state) => state.UserReducer);
  const [color, setColor] = useState("rgba(217, 217, 217, 1)");
  const [name, setName] = useState(expense === undefined ? "" : expense.name);
  const [amount, setAmount] = useState(
    expense === undefined ? "" : expense.amount
  );
  const [wallet, setWallet] = useState({});
  const dispatch = useDispatch();
  let date = new Date();
  date = date.toLocaleDateString();
  const finalMount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <ModalStructure>
      <View style={styles.containerInfo}>
        <View
          style={{
            height: 162,
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
              {expense === undefined ? "Nuevo Gasto" : "Editar Gasto"}
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
              {expense === undefined
                ? "Puedes crear tu gasto, debe tener las siguientes caracteristicas"
                : "Si quieres editar tus gastos, solo tienes que poner nuevos datos como la primera vez que lo creaste"}
            </Text>
          </View>
        </View>
        <View style={styles.containerForm}>
          <TextInput
            placeholder="Nombre del Gasto"
            style={styles.input}
            placeholderTextColor={"rgba(16, 40, 64, 0.9)"}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Cantidad"
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor={"rgba(16, 40, 64, 0.9)"}
            value={finalMount === "$0" ? "" : finalMount}
            onChangeText={(text) =>
              setAmount(
                Number(
                  text
                    .split("")
                    .filter((item) => /\d/.test(item) === true)
                    .join("")
                )
              )
            }
          />
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
            {date}
          </Text>
        </View>
        <View style={styles.containerWallets}>
          <Text
            style={[styles.input, { borderBottomWidth: 0, fontWeight: "600" }]}
          >
            Wallet
          </Text>
          <View style={styles.scrollWallets}>
            <FlatList
              horizontal={true}
              data={wallets}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <MiniWallet
                  wallet={item}
                  modalFunc={setColor}
                  modalWallet={setWallet}
                />
              )}
            />
          </View>
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
              style={[styles.button, { backgroundColor: color }]}
              onPress={() => {
                if (expense === undefined) {
                  dispatch(createExpense(list, wallet, name, amount, date));
                  dispatch({
                    type: USER_UPDATE,
                    payload: { totalAmount: user.totalAmount - amount },
                  });
                } else {
                  dispatch(
                    amount === expense.amount &&
                      updateWallet(wallet, {
                        ...wallet,
                        totalAmount: wallet.income + expense.amount - amount,
                      })
                  );
                  dispatch(
                    updateExpense(expense, {
                      ...expense,
                      name: name !== expense.name ? name : expense.name,
                      amount:
                        amount !== expense.amount ? amount : expense.amount,
                      wallet:
                        wallet._id !== expense.wallet._id
                          ? wallet
                          : expense.wallet,
                    })
                  );
                }
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
});

export default ModalExpense;

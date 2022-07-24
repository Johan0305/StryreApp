import React, { useState } from "react";
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import iconPlus from "../assets/icons/plusbutton.png";
import iconEdit from "../assets/icons/editar-texto.png";
import Expense from "../components/Wallet/Expense";
import ModalEdit from "../components/Wallet/ModalEdit";
import ModalStructure from "../components/ModalStructure";
import ModalAdd from "../components/Wallet/ModalAdd";
import { useSelector } from "react-redux";

const Wallet = ({ route }) => {
  const { walletId } = route.params;
  const { wallets } = useSelector((state) => state.WalletReducer);
  const { expenses } = useSelector((state) => state.ExpenseReducer);
  const [modalView1, setModalView1] = useState(false);
  const [modalView2, setModalView2] = useState(false);
  const [thisWallet] = wallets.filter(({ _id }) => _id === walletId);
  const theseExpenses = expenses.filter(
    ({ wallet }) => wallet?._id === walletId
  );

  const finalMount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(thisWallet.income);

  return (
    <View style={styles.containerGlobal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalView1}
        onRequestClose={() => {
          setModalView1(!modalView1);
        }}
      >
        <ModalAdd modalFunc={setModalView1} wallet={thisWallet} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalView2}
        onRequestClose={() => {
          setModalView2(!modalView2);
        }}
      >
        <ModalEdit
          modalFunc={setModalView2}
          wallet={thisWallet}
          theseExpenses={theseExpenses}
        />
      </Modal>
      <View
        style={[styles.containerTop, { backgroundColor: thisWallet.color }]}
      >
        <View style={styles.containerTopInternal}>
          <View style={styles.containerText}>
            <Text style={styles.titleText}>{thisWallet.name}</Text>
            <Text style={[styles.titleText, { fontSize: 50 }]}>
              {finalMount}
            </Text>
          </View>
          <View style={styles.containerIcons}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="transparent"
              style={styles.icon}
              onPress={() => setModalView1(!modalView1)}
            >
              <Image source={iconPlus} style={styles.icon} />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="transparent"
              style={styles.icon}
              onPress={() => setModalView2(!modalView2)}
            >
              <Image source={iconEdit} style={styles.icon} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.containerBottomInternal}>
          <Text style={styles.textExpense}>Gastos</Text>
          <View style={styles.scrollContainer}>
            <FlatList
              data={theseExpenses}
              renderItem={({ item }) => <Expense expense={item} />}
              keyExtractor={(i, index) => index}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerGlobal: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  containerTop: {
    width: "100%",
    height: "42.3%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTopInternal: {
    width: "84.7%",
    height: "69.8%",
    justifyContent: "space-between",
  },
  containerText: {
    width: "100%",
    height: "56.6%",
    justifyContent: "space-between",
  },
  titleText: {
    textAlign: "center",
    color: "#ffff",
    width: "100%",
    height: "39%",
    fontSize: 40,
    fontWeight: "bold",
  },
  containerIcons: {
    width: "100%",
    height: "16.88%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  icon: {
    width: 42,
    height: 42,
  },
  containerBottom: {
    width: "100%",
    height: "61.62%",
    backgroundColor: "#ffff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    top: -33,
  },
  containerBottomInternal: {
    width: "85.13%",
    height: "85.197%",
    justifyContent: "space-between",
  },
  textExpense: {
    width: "21%",
    height: "6.32%",
    color: "rgba(16, 40, 64, 1)",
    fontSize: 20,
    fontWeight: "700",
  },
  scrollContainer: {
    width: "100%",
    height: "89.62%",
  },
});

export default Wallet;

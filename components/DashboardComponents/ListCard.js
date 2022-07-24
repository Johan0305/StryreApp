import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import next from "../../assets/icons/next.png";
import ModalDeleteList from "./ModalDeleteList";
const ListCard = ({ navigation, thisList }) => {
  const { expenses } = useSelector((state) => state.ExpenseReducer);
  const [modalDeleteList, setModalDeleteList] = useState(false);
  const filterExpenses = expenses.filter(({ list }) => list === thisList._id);

  return (
    <View style={{ marginBottom: 20, flexDirection: "row" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDeleteList}
        onRequestClose={() => {
          setModalDeleteList(!modalDeleteListsetModalDeleteList);
        }}
      >
        <ModalDeleteList modalFunc={setModalDeleteList} listId={thisList._id} />
      </Modal>
      <TouchableHighlight
        style={styles.containerGlobal1}
        activeOpacity={0.6}
        underlayColor="rgba(235, 233, 230, 0.8)"
        onLongPress={() => setModalDeleteList(true)}
      >
        <View style={styles.containerInfo}>
          <Text style={styles.textTitle}>{thisList.name}</Text>
          <Text style={styles.textInfo}>
            Tienes {filterExpenses.length} gastos
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.containerGlobal2}
        activeOpacity={0.6}
        underlayColor="#41576e"
        onPress={() => navigation.navigate("List", { listId: thisList._id })}
      >
        <Image source={next} style={{ width: 35, height: 35 }} />
      </TouchableHighlight>
    </View>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  containerGlobal1: {
    minHeight: 98,
    maxHeight: 98,
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
    minHeight: 98,
    maxHeight: 98,
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
    backgroundColor: "#102840",
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

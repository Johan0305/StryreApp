import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ModalExpense from "../components/List/ModalExpense";
import Expense from "../components/Wallet/Expense";
import { updateList } from "../store/reducers/List.reducer";

const List = ({ route }) => {
  const { listId } = route.params;
  const { lists } = useSelector((state) => state.ListReducer);
  const { expenses } = useSelector((state) => state.ExpenseReducer);
  const { user } = useSelector((state) => state.UserReducer);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalExpense, setModalExpense] = useState(false);
  const [thisList] = lists.filter(({ _id }) => _id === listId);
  const dispatch = useDispatch();

  const theseExpenses = expenses.filter(({ list }) => list === listId);
  const [title, setTitle] = useState(thisList.name);

  console.log(theseExpenses);
  return (
    <View style={styles.containerGlobal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalExpense}
        onRequestClose={() => {
          setModalExpense(!modalExpense);
        }}
      >
        <ModalExpense modalFunc={setModalExpense} list={thisList} />
      </Modal>
      <View style={styles.containerTitle}>
        <TextInput
          style={styles.title}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          onBlur={() =>
            dispatch(updateList(thisList._id, { ...thisList, name: title }))
          }
        />
      </View>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="transparent"
        onPress={() => setModalExpense(true)}
        style={{ width: "85.13%" }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.containerGlobal1}>
            <Text style={styles.textTitle}>Crear Gasto</Text>
          </View>
          <View style={styles.containerGlobal2}></View>
        </View>
      </TouchableHighlight>
      <View style={styles.containerMap}>
        <View style={styles.containerMapInternal}>
          <FlatList
            data={theseExpenses.reverse()}
            renderItem={({ item }) => (
              <Expense
                expense={item}
                modalFuncDel={setModalDelete}
                modalFunc={setModalExpense}
              />
            )}
            keyExtractor={(i, index) => index}
          />
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
    justifyContent: "space-between",
    backgroundColor: "#EBE9E6",
  },
  containerTitle: {
    width: "100%",
    height: 93,
    backgroundColor: "#102840",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: "rgba(217, 217, 217, 1)",
    width: 330,
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
  },
  containerMap: {
    width: "100%",
    height: 610,
    backgroundColor: "#EBE9E6",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerMapInternal: {
    width: 332,
    height: 554,
    marginTop: 20,
  },
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
    backgroundColor: "#B4B2AC",
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
    width: "100%",
    textAlign: "center",
  },
  textInfo: {
    fontSize: 16,
    fontWeight: "400",
    color: "#3F3F3F",
    marginLeft: 15,
  },
});
export default List;

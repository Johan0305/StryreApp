import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import iconPlus from "../assets/icons/plusbutton.png";
import menu from "../assets/icons/menu.png";
import WalletCard from "../components/DashboardComponents/WalletCard";
import ListCard from "../components/DashboardComponents/ListCard";
import { useEffect, useState } from "react";
import imgProfile from "../assets/icons/userBig.png";
import ModalDashboard from "../components/DashboardComponents/ModalDashboard";
import { useSelector, useDispatch } from "react-redux";
import "intl";
import "intl/locale-data/jsonp/en";
import { getDataUser } from "../store/reducers/User.reducer";
import { getWallets } from "../store/reducers/Wallet.reducer";
import ModalAdd from "../components/Wallet/ModalAdd";
import { createList, getLists } from "../store/reducers/List.reducer";
import { getExpenses } from "../store/reducers/Expense.reducer";

const Dashboard = ({ navigation }) => {
  const { user, loading } = useSelector((state) => state.UserReducer);
  const { wallets } = useSelector((state) => state.WalletReducer);
  const { lists } = useSelector((state) => state.ListReducer);
  const dispatch = useDispatch();
  const [modalView, setModalView] = useState(false);
  const [nameList, setNameList] = useState("");

  useEffect(() => {
    dispatch(getDataUser());
    dispatch(getWallets(user));
    dispatch(getLists());
    dispatch(getExpenses());
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Bienvenido ${user.name}`,
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#FFFF",
      },
      headerTintColor: "#102840",
      headerTitleStyle: {
        fontWeight: "400",
        fontSize: 20,
      },

      headerRight: () => (
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor="#b3b1b1"
          style={{ right: "7.5%", borderRadius: 20 }}
          onPress={() =>
            navigation.navigate("Profile", {
              name: user.name,
              picture: user.picture,
            })
          }
        >
          <Image
            source={
              user.picture !== "nothing" ? { uri: user.picture } : imgProfile
            }
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
            }}
          />
        </TouchableHighlight>
      ),
    });
  }, [user]);

  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <ActivityIndicator size="large" color="#D3C27F" />
      </View>
    );
  }

  const mountGlobalText = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(user.totalAmount);

  console.log(user);
  return (
    <View style={styles.globalContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalView}
        onRequestClose={() => {
          setModalView(!modalView);
        }}
      >
        <ModalDashboard modalFunc={setModalView} />
      </Modal>

      <KeyboardAvoidingView
        behavior="padding"
        enabled={false}
        style={styles.globalContainer}
      >
        <View style={styles.balanceContainer}>
          <View style={{ backgroundColor: "white" }}>
            <Text style={styles.titleText}>Balance Total</Text>
            <Text style={styles.titleMount}>{mountGlobalText}</Text>
          </View>
        </View>
        <View style={styles.walletContainer}>
          <View
            style={{
              height: "80.93%",
              minHeight: 123,
              top: "-5.15%",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.titleText}>Wallets</Text>
            <View
              style={{
                flexDirection: "row",
                height: "72.35%",
                minHeight: 89,
                width: "100%",
              }}
            >
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#41576e"
                style={styles.button}
                onPress={() => setModalView(true)}
              >
                <Image
                  source={iconPlus}
                  style={{
                    maxWidth: 30,
                    width: "48.4%",
                    maxHeight: 30,
                    height: "33.73%",
                  }}
                />
              </TouchableHighlight>
              <View
                style={{
                  width: "80%",
                  height: "110%",
                  alignContent: "center",
                  marginLeft: "3.3%",
                }}
              >
                <FlatList
                  data={wallets}
                  style={{ width: "100%" }}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <WalletCard navigation={navigation} walletInfo={item} />
                  )}
                  keyExtractor={(i, index) => index}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listContainer}>
          <View>
            <View style={{ flexDirection: "row", minWidth: 240 }}>
              <Text style={styles.titleText}>Listas</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", minWidth: 100 }}>
            <TextInput
              placeholder="Nueva lista"
              placeholderTextColor="#3F3F3F"
              style={styles.buttonCreateList1}
              value={nameList}
              onChangeText={(text) => setNameList(text)}
            />
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#41576e"
              style={styles.buttonCreateList2}
              onPress={() => {
                dispatch(createList(nameList));
                setNameList("");
              }}
            >
              <Image
                source={iconPlus}
                style={{
                  maxWidth: 20,
                  width: 20,
                  maxHeight: 20,
                  height: 20,
                }}
              />
            </TouchableHighlight>
          </View>
          {lists.length === 0 ? (
            <View
              style={{
                with: "100%",
                height: "80%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#102840", fontSize: 24, fontWeight: "bold" }}
              >
                ¡Este es el espacio para crear tus listas!
              </Text>
            </View>
          ) : (
            <FlatList
              data={lists}
              style={{ marginTop: 20 }}
              renderItem={({ item }) => (
                <ListCard navigation={navigation} thisList={item} />
              )}
              keyExtractor={(i, index) => index}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    backgroundColor: "#FFFF",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  balanceContainer: {
    height: "9.36%",
    minHeight: 91,
    width: "94.36%",
    paddingLeft: "2.57%",
    minWidth: 260,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  walletContainer: {
    height: "19.49%",
    minHeight: 152,
    width: "94.36%",
    minWidth: 260,
    left: "2.57%",
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  listContainer: {
    height: "19.49%",
    minHeight: 430,
    width: "92.83%",
    minWidth: 260,
    paddingRight: "2.57%",
    paddingLeft: "2.57%",
  },
  titleText: {
    height: "26.02%",
    minHeight: 32,
    width: "92.4%",
    minWidth: 210,
    color: "#102840",
    fontSize: 20,
    fontWeight: "600",
  },
  titleMount: {
    height: "26.02%",
    minHeight: 59,
    width: "92.4%",
    minWidth: 210,
    color: "#897937",
    fontSize: 30,
    fontWeight: "600",
  },
  button: {
    height: "100%",
    minHeight: 89,
    width: "16.85%",
    minWidth: 62,
    maxWidth: 100,
    backgroundColor: "#102840",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonCreateList1: {
    minWidth: 200,
    width: "85%",
    minHeight: 48,
    backgroundColor: "#F1F1F1",
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    paddingLeft: 25,
    fontSize: 20,
    fontWeight: "400",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonCreateList2: {
    minWidth: 40,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B4B2AC",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopColor: "#f1f1f1",
    borderRightColor: "#f1f1f1",
    borderBottomColor: "#f1f1f1",
    borderWidth: 2,
    borderLeftWidth: 0,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Dashboard;

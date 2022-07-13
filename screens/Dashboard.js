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
} from "react-native";
import iconPlus from "../assets/icons/plusbutton.png";
import menu from "../assets/icons/menu.png";
import WalletCard from "../components/DashboardComponents/WalletCard";
import ListCard from "../components/DashboardComponents/ListCard";
import { useState } from "react";
import ModalDashboard from "../components/DashboardComponents/ModalDashboard";

const Dashboard = () => {
  const [modalView, setModalView] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.globalContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          console.log("arroz");
        }}
      >
        <ModalDashboard />
      </Modal>
      <KeyboardAvoidingView behavior="height" style={styles.globalContainer}>
        <View style={styles.balanceContainer}>
          <View style={{ backgroundColor: "white" }}>
            <Text style={styles.titleText}>Balance Total</Text>
            <Text style={styles.titleMount}>$12.345.235.634</Text>
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
              <ScrollView
                horizontal={true}
                style={{
                  maxWidth: "100%",
                  height: "110%",
                  alignContent: "center",
                  marginLeft: "4.35%",
                }}
              >
                <WalletCard color={"#DF6767"} />
                <WalletCard color={"#846A9D"} />
                <WalletCard color={"#5B94BD"} />
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.listContainer}>
          <View>
            <View style={{ flexDirection: "row", minWidth: 240 }}>
              <Text style={styles.titleText}>Listas</Text>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="transparent"
                style={{
                  height: 32,
                  width: 28,
                  justifyContent: "center",
                  marginRight: 0,
                }}
                onPress={() => console.log("holaaa")}
              >
                <Image
                  source={menu}
                  style={{
                    width: "100%",
                    minHeight: 28,
                    maxHeight: 28,
                  }}
                />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ flexDirection: "row", minWidth: 100 }}>
            <TextInput
              placeholder="Nueva lista"
              placeholderTextColor="#3F3F3F"
              style={styles.buttonCreateList1}
            />
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#41576e"
              style={styles.buttonCreateList2}
              onPress={() => console.log("no")}
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
          <ScrollView contentContainerStyle={{ marginTop: 20 }}>
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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

import { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,
} from "react-native";
import iconPlus from "../../assets/icons/plusbutton.png";
import ModalAdd from "../Wallet/ModalAdd";
import ModalDeleteWallet from "./ModalDeleteWallet";

const WalletCard = ({ navigation, walletInfo }) => {
  const [modalDeleteWallet, setModalDeleteWallet] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  const finalMount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(walletInfo.income);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDeleteWallet}
        onRequestClose={() => {
          setModalDeleteWallet(!modalDeleteWallet);
        }}
      >
        <ModalDeleteWallet
          modalFunc={setModalDeleteWallet}
          idDelete={walletInfo._id}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAdd}
        onRequestClose={() => {
          setModalAdd(!modalAdd);
        }}
      >
        <ModalAdd modalFunc={setModalAdd} wallet={walletInfo} />
      </Modal>
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={walletInfo.color}
        style={[styles.containerCard, { backgroundColor: walletInfo.color }]}
        onPress={() =>
          navigation.navigate("Wallet", {
            walletId: walletInfo._id,
          })
        }
        onLongPress={() => setModalDeleteWallet(true)}
      >
        <View style={styles.containerInternal}>
          <Text style={styles.titleWallet}>{walletInfo.name}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.mountWallet}>{finalMount}</Text>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="transparent"
              style={styles.button}
              onPress={() => setModalAdd(true)}
            >
              <Image
                source={iconPlus}
                style={{
                  maxWidth: 22,
                  maxHeight: 22,
                  height: 22,
                  width: 22,
                }}
              />
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    marginRight: 20,
    minHeight: 88,
    height: "89.912%",
    minWidth: 220,
    maxWidth: 398,
    borderRadius: 20,
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
  containerInternal: {
    minHeight: 71,
    minWidth: 190,
    marginLeft: 16,
    marginTop: 11,
  },
  titleWallet: {
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
  mountWallet: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginTop: "2.905%",
  },
  button: {
    justifyContent: "flex-end",
    marginRight: "15%",
  },
});

export default WalletCard;

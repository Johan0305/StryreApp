import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteWallet } from "../../store/reducers/Wallet.reducer";
import ModalStructure from "../ModalStructure";

const ModalDeleteWallet = ({ modalFunc, idDelete }) => {
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  return (
    <ModalStructure>
      <View style={styles.containerModal}>
        <View style={styles.containerText}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "600",
              textAlign: "center",
              height: 48,
            }}
          >
            Eliminar Wallet
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "300",
              textAlign: "center",
              height: 58,
            }}
          >
            ¿Deseas eliminar tu wallet? Esta acción no se puede deshacer
          </Text>
        </View>
        <View
          style={{
            height: 98,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: 36,
            }}
          >
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="rgba(155, 33, 55, 0.6)"
              style={styles.button}
              onPress={() => dispatch(deleteWallet(idDelete, user, modalFunc))}
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
  containerModal: {
    width: 278,
    height: 239,
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerText: {
    width: "100%",
    minHeight: 116,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#9B2137",
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

export default ModalDeleteWallet;

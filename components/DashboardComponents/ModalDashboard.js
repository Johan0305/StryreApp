import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const ModalDashboard = () => {
  console.log("hola");
  return (
    <View style={styles.containerBackground}>
      <View style={styles.containerModal}>
        <View style={styles.containerInfo}>
          <View
            style={{
              height: "27.07%",
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
                Nuevo Wallet
              </Text>
            </View>
            <View
              style={[
                styles.textTop,
                {
                  height: "65.89%",
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
                Diseña tu nuevo wallet para un mejor orden de tus cuentas y
                metodos de pago
              </Text>
            </View>
          </View>
          <View style={styles.containerForm}>
            <TextInput
              placeholder="Correo Electrónico"
              style={styles.input}
              autoComplete={"email"}
              placeholderTextColor={"#102840"}
            />
            <TextInput
              placeholder="Correo Electrónico"
              style={styles.input}
              autoComplete={"email"}
              placeholderTextColor={"#102840"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(217, 217, 217, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  containerModal: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 255,
    width: "91.8%",
    minHeight: 600,
    height: "86.85%",
    backgroundColor: "#ffff",
    borderRadius: 20,
  },
  containerInfo: {
    width: "77.66%",
    minHeight: 515,
    height: "85.96%",
    borderColor: "black",
    borderWidth: 1,
  },
  textTop: {
    height: "28.25%",
    width: "100%",
    justifyContent: "center",
  },
  containerForm: {
    width: 278,
    height: 116,
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    height: 36,
    backgroundColor: "transparent",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});

export default ModalDashboard;

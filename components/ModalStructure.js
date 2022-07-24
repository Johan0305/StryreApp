import React from "react";
import { StyleSheet, View } from "react-native";

const ModalStructure = ({ children }) => {
  return (
    <View style={styles.containerBackground}>
      <View style={styles.containerModal}>{children}</View>
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
    minHeight: 102,
    backgroundColor: "#ffff",
    borderRadius: 20,
    paddingVertical: 42,
  },
});

export default ModalStructure;

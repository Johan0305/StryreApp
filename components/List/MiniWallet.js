import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const MiniWallet = ({ wallet, modalFunc, modalWallet }) => {
  const mountGlobalText = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(wallet.income);

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={wallet.color}
      style={[styles.containerCard, { backgroundColor: wallet.color }]}
      onPress={() => {
        modalFunc(wallet.color);
        modalWallet(wallet);
      }}
    >
      <View style={styles.containerInternal}>
        <Text style={styles.titleWallet}>{wallet.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.mountWallet}>{mountGlobalText}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    marginRight: 20,
    minHeight: 73,
    height: 73,
    minWidth: 151,
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
    height: 63,
    minWidth: 118,
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
    marginRight: 20,
  },
  button: {
    justifyContent: "flex-end",
    marginRight: "15%",
  },
});

export default MiniWallet;

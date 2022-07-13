import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import next from "../../assets/icons/next.png";
const ListCard = () => {
  return (
    <View style={{ marginBottom: 20, flexDirection: "row" }}>
      <View style={styles.containerGlobal1}>
        <View style={styles.containerInfo}>
          <Text style={styles.textTitle}>Nombre Lista</Text>
          <Text style={styles.textInfo}>Tienes 45 gastos</Text>
        </View>
      </View>
      <TouchableHighlight
        style={styles.containerGlobal2}
        activeOpacity={0.6}
        underlayColor="#41576e"
        onPress={() => console.log("no")}
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

import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import iconPlus from "../../assets/icons/plusbutton.png";

const WalletCard = ({ color }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={color}
      style={[styles.containerCard, { backgroundColor: color }]}
      onPress={() => console.log("holaaa")}
    >
      <View style={styles.containerInternal}>
        <Text style={styles.titleWallet}>Efectivo</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.mountWallet}>$500.000</Text>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="transparent"
            style={styles.button}
            onPress={() => console.log("holaaa")}
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

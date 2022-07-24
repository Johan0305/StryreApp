import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Wallet from "./screens/Wallet";
import Dashboard from "./screens/Dashboard";
import { Provider } from "react-redux";
import { store } from "./store";
import List from "./screens/List";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const App = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const getToken = async () => {
    const value = await AsyncStorage.getItem("token");
    setToken(value);
    setLoading(false);
  };
  useEffect(() => {
    getToken();
  }, []);
  console.log(token);

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
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            token === null || token === undefined ? "Login" : "Dashboard"
          }
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Wallet"
            component={Wallet}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="List"
            component={List}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  buttonProfile: {
    backgroundColor: "white",
  },
});

export default App;

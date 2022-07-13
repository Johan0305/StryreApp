import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import imgProfile from "./assets/icons/user1.png";
import Dashboard from "./screens/Dashboard";
import { Provider } from "react-redux";
import { store } from "./store";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Register",
              headerStyle: {
                backgroundColor: "#102840",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          /> */}
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: "Bienvenido John Doe",
              headerRight: () => (
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor="#b3b1b1"
                  style={{ right: "7.5%", borderRadius: 20 }}
                  onPress={() => console.log("holaaa")}
                >
                  <Image
                    source={imgProfile}
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "black",
                      borderRadius: 50,
                    }}
                  />
                </TouchableHighlight>
              ),
              headerStyle: {
                backgroundColor: "#FFFF",
              },
              headerTintColor: "#102840",
              headerTitleStyle: {
                fontWeight: "400",
                fontSize: 20,
              },
            }}
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

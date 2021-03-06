import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { getWallets } from "./Wallet.reducer";
import { getLists } from "./List.reducer";
import { getExpenses } from "./Expense.reducer";

const USER_LOADING = "USER_LOADING";
const USER_SUCCESS = "USER_SUCESS";
export const USER_UPDATE = "USER_UPDATE";

const initialState = {
  user: [],
  loading: false,
  error: null,
};

export const registerUser = (name, email, password, navigation) => {
  return async function (dispatch) {
    try {
      const user = await axios.post(
        `https://styreapp.herokuapp.com/users/register`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      await AsyncStorage.setItem("token", user.data.data.token);
      const token = await AsyncStorage.getItem("token");
      token && navigation.navigate("Dashboard");
    } catch (err) {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Por favor, rectifica tu información para que puedas continuar",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
    }
  };
};

export const loginUser = (email, password, navigation) => {
  return async function (dispatch) {
    try {
      const user = await axios.post(
        `https://styreapp.herokuapp.com/users/login`,
        {
          email: email,
          password: password,
        }
      );
      await AsyncStorage.setItem("token", user.data.data.token);
      const token = await AsyncStorage.getItem("token");
      token ? navigation.navigate("Dashboard") : null;
    } catch (err) {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Email o Código incorrecto, si todavía no tienes cuenta registrate con nosotros",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
    }
  };
};

export const getDataUser = () => {
  return async function (dispatch) {
    try {
      dispatch({ type: USER_LOADING, payload: true });
      const token = await AsyncStorage.getItem("token");
      const user = await axios.get(`https://styreapp.herokuapp.com/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: USER_SUCCESS, payload: user.data.data });
      dispatch({ type: USER_LOADING, payload: false });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = (data) => {
  return async function (dispatch) {
    try {
      dispatch({ type: USER_LOADING, payload: true });
      const token = await AsyncStorage.getItem("token");
      const user = await axios.put(
        `https://styreapp.herokuapp.com/users/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: USER_UPDATE, payload: user.data.data });
      dispatch({ type: USER_LOADING, payload: false });
    } catch (err) {
      console.log(err);
    }
  };
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case USER_UPDATE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

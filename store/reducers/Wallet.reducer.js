import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { EXPENSE_UPDATE_WALLET } from "./Expense.reducer";
import { updateUser } from "./User.reducer";

const WALLET_LOADING = "WALLET_LOADING";
const WALLET_SUCCESS = "WALLET_SUCCESS";
const WALLET_UPDATE = "WALLET_UPDATE";
const GET_WALLETS = "GET_WALLETS";
const DELETE_WALLET = "DELETE_WALLET";

const initialState = {
  wallets: [],
  loadingWallets: false,
  error: null,
};

export const createWallet = (name, income, color, modalFunc, user) => {
  return async function (dispatch) {
    try {
      const token = await AsyncStorage.getItem("token");
      const wallet = await axios.post(
        "http://192.168.1.140:8080/wallets/",
        {
          name: name,
          income: income,
          color: color,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        updateUser({
          ...user,
          totalAmount: user.totalAmount + income,
        })
      );
      dispatch({
        type: WALLET_SUCCESS,
        payload: wallet.data.data,
      });
      modalFunc(false);
    } catch (err) {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de crear tu Wallet!",
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

export const getWallets = (user) => {
  return async function (dispatch) {
    try {
      dispatch({ type: WALLET_LOADING, payload: true });
      const token = await AsyncStorage.getItem("token");
      const wallet = await axios.get("http://192.168.1.140:8080/wallets/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        updateUser({
          ...user,
          totalAmount: wallet.data.data
            .map(({ income }) => income)
            .reduce((ac, num) => ac + num),
        })
      );
      dispatch({
        type: GET_WALLETS,
        payload: wallet.data.data,
      });
      dispatch({ type: WALLET_LOADING, payload: false });
    } catch (err) {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de traer tus Wallets!",
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

export const deleteWallet = (walletId, user, modalFunc) => {
  return async function (dispatch) {
    try {
      const wallet = await axios.delete(
        `http://192.168.1.140:8080/wallets/${walletId}`
      );
      dispatch(
        updateUser({
          ...user,
          totalAmount: user.totalAmount - wallet.data.data.income,
        })
      );
      dispatch({
        type: DELETE_WALLET,
        payload: wallet.data.data._id,
      });
      modalFunc(false);
    } catch (err) {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de eliminar tu Wallet!",
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

export const updateWallet = (wallet, data) => {
  return async function (dispatch) {
    try {
      const walletPut = await axios.put(
        `http://192.168.1.140:8080/wallets/${wallet._id}`,
        data
      );
      dispatch({
        type: EXPENSE_UPDATE_WALLET,
        payload: walletPut.data.data,
      });
      dispatch({ type: WALLET_UPDATE, payload: walletPut.data.data });
    } catch (err) {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        `Algo ha fallado al momento de actualizar tu Wallet! ${err}`,
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

export const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_LOADING:
      return {
        ...state,
        loadingWallets: action.payload,
      };
    case WALLET_SUCCESS:
      return {
        ...state,
        wallets: [action.payload, ...state.wallets],
      };
    case GET_WALLETS:
      return {
        ...state,
        wallets: action.payload.reverse(),
      };
    case DELETE_WALLET:
      return {
        ...state,
        wallets: state.wallets.filter(({ _id }) => _id !== action.payload),
      };
    case WALLET_UPDATE:
      return {
        ...state,
        wallets: [
          action.payload,
          ...state.wallets.filter(({ _id }) => _id !== action.payload._id),
        ],
      };
    default:
      return state;
  }
};

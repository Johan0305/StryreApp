import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { updateWallet } from "./Wallet.reducer";

const EXPENSE_LOADING = "EXPENSE_LOADING";
const EXPENSE_UPDATE = "EXPENSE_UPDATE";
const DELETE_EXPENSE = "DELETE_EXPENSE";
const GET_EXPENSES = "GET_EXPENSES";
const EXPENSE_SUCCESS = "EXPENSE_SUCCESS";
export const EXPENSE_UPDATE_WALLET = "EXPENSE_UPDATE_WALLET";

const initialState = {
  expenses: [],
  loadingExpenses: false,
  error: null,
};

export const createExpense = (list, wallet, name, amount, date) => {
  return async function (dispatch) {
    try {
      const token = await AsyncStorage.getItem("token");
      const expense = await axios.post(
        `http://192.168.1.140:8080/expenses/${list._id}/${wallet._id}`,
        {
          name: name,
          amount: amount,
          date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        updateWallet(wallet, { ...wallet, income: wallet.income - amount })
      );
      dispatch({ type: EXPENSE_SUCCESS, payload: expense.data.data });
    } catch {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de crear tu gasto!",
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

export const getExpenses = () => {
  return async function (dispatch) {
    try {
      const token = await AsyncStorage.getItem("token");
      const expenses = await axios.get(`http://192.168.1.140:8080/expenses/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(expenses);
      dispatch({ type: GET_EXPENSES, payload: expenses.data.data });
    } catch {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de crear tu gasto!",
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

export const deleteExpense = (expensed) => {
  return async function (dispatch) {
    try {
      const expense = await axios.delete(
        `http://192.168.1.140:8080/expenses/${expensed._id}`
      );
      dispatch({ type: DELETE_EXPENSE, payload: expense.data.data._id });
    } catch {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de crear tu gasto!",
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

export const updateExpense = (expense, data) => {
  return async function (dispatch) {
    try {
      const expensePut = await axios.put(
        `http://192.168.1.140:8080/expenses/${expense._id}`,
        data
      );
      dispatch({ type: EXPENSE_UPDATE, payload: expensePut.data.data });
    } catch {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de crear tu gasto!",
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

export const ExpenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPENSE_LOADING:
      return {
        ...state,
        loadingExpenses: action.payload,
      };
    case EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses.reverse()].reverse(),
      };
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(({ _id }) => _id !== action.payload),
      };
    case EXPENSE_UPDATE:
      return {
        ...state,
        expenses: [
          action.payload,
          ...state.expenses
            .filter(({ _id }) => _id !== action.payload._id)
            .reverse(),
        ].reverse(),
      };
    case EXPENSE_UPDATE_WALLET:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          state.expenses
            .filter(({ _id }) => _id === action.payload._id)
            .map((item) => ({
              ...item,
              wallet: action.payload,
            })),
        ],
      };
    default:
      return state;
  }
};

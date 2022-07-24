import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

const LIST_LOADING = "LIST_LOADING";
const LIST_SUCCESS = "LIST_SUCCESS";
export const LIST_UPDATE = "LIST_UPDATE";
const GET_LISTS = "GET_LISTS";
const DELETE_LIST = "DELETE_LIST";

const initialState = {
  lists: [],
  loadingList: false,
  error: null,
};

export const createList = (name) => {
  return async function (dispatch) {
    try {
      const token = await AsyncStorage.getItem("token");
      const list = await axios.post(
        "https://styreapp.herokuapp.com/lists/",
        {
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: LIST_SUCCESS, payload: list.data.data });
    } catch (err) {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de crear tu Lista!",
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

export const getLists = () => {
  return async function (dispatch) {
    try {
      dispatch({ type: LIST_LOADING, payload: true });
      const token = await AsyncStorage.getItem("token");
      const lists = await axios.get("https://styreapp.herokuapp.com/lists/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_LISTS, payload: lists.data.data });
      dispatch({ type: LIST_LOADING, payload: false });
    } catch (err) {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de traer tus Listas!",
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

export const deleteList = (listId, modalFunc) => {
  return async function (dispatch) {
    try {
      const list = await axios.delete(
        `https://styreapp.herokuapp.com/lists/${listId}`
      );
      dispatch({ type: DELETE_LIST, payload: list.data.data._id });
      modalFunc(false);
    } catch (err) {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de eliminar tu Lista!",
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

export const updateList = (listId, data) => {
  return async function (dispatch) {
    try {
      const list = await axios.put(
        `https://styreapp.herokuapp.com/lists/${listId}`,
        data
      );
      dispatch({ type: LIST_UPDATE, payload: list.data.data });
    } catch (err) {
      Alert.alert(
        "Ups! Algo mal ha ocurrido",
        "Algo ha fallado al momento de editar tu Lista!",
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

export const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_LOADING:
      return {
        ...state,
        loadingList: action.payload,
      };
    case LIST_SUCCESS:
      return {
        ...state,
        lists: [action.payload, ...state.lists],
      };
    case GET_LISTS:
      return {
        ...state,
        lists: action.payload.reverse(),
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(({ _id }) => _id !== action.payload),
      };
    case LIST_UPDATE:
      return {
        ...state,
        lists: [
          action.payload,
          ...state.lists.filter(({ _id }) => _id !== action.payload._id),
        ],
      };
    default:
      return state;
  }
};

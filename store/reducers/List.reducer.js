const LISTS_SUCCESS = "LISTS_SUCCESS";

const initialState = {
  lists: [],
  loading: false,
  error: null,
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTS_SUCCESS:
      return {
        ...state,
        lists: action.payload,
      };
    default:
      return state;
  }
};

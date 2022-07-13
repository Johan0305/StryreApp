import { createStore, combineReducers, applyMiddleware } from "redux";
import { listReducer } from "./reducers/List.reducer";
const rootReducer = combineReducers({
  listReducer,
});

export const store = createStore(rootReducer);

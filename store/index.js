import { createStore, combineReducers, applyMiddleware } from "redux";
import { UserReducer } from "./reducers/User.reducer";
import { WalletReducer } from "./reducers/Wallet.reducer";
import { ListReducer } from "./reducers/List.reducer";
import { ExpenseReducer } from "./reducers/Expense.reducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  UserReducer,
  WalletReducer,
  ListReducer,
  ExpenseReducer,
});

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);

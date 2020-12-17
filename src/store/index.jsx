import { createStore, applyMiddleware, compose } from "redux";
import { unitReducer } from "./reducers";
import thunk from "redux-thunk";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  unitReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

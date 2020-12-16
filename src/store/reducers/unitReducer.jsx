import _ from "lodash";

const initialState = {
  units: [],
  loading: true,
  error: null,
  unit: {},
  isLogin: false,
  dataOrder: {},
  orders: []
};

export default function unitReducer(state = initialState, action) {
  if (action.type === "SET_UNITS") {
    return { ...state, units: action.payload };
  }
  if (action.type === "SET_ERROR") {
    return { ...state, error: action.payload };
  }
  if (action.type === "SET_LOADING") {
    return { ...state, loading: action.payload };
  }
  if (action.type === "ADD_UNIT") {
    const newUnits = state.units.concat(action.payload);
    return { ...state, units: newUnits };
  }
  if (action.type === "SET_UNIT") {
    return { ...state, unit: action.payload };
  }
  if (action.type === "EDIT_UNIT") {
    const unitClone = _.cloneDeep(state.units);
    for (const unit in unitClone) {
      if (unitClone[unit]._id === action.payload._id) {
        unitClone[unit] = action.payload;
        break;
      }
    }
    return { ...state, units: unitClone };
  }
  if (action.type === "DELETE_UNIT") {
    const newUnits = state.units.filter((unit) => unit._id !== action.payload);
    return { ...state, units: newUnits };
  }
  if (action.type === "SET_ISLOGIN") {
    return { ...state, isLogin: action.payload };
  }
  if( action.type === "SET_ID" ) {
    console.log({ ...state, dataOrder: action.payload})
    return { ...state, dataOrder: action.payload}
  }
  if( action.type === "SET_ORDERS" ) {
    return { ...state, orders: action.payload}
  }
  if( action.type === "ADD_ORDER" ) {
    const newOrders = state.orders.concat(action.payload)
    return { ...state, orders: newOrders }
  }
  return state;
}

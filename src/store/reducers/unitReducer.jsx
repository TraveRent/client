const initialState = {
  units: [],
  loading: true,
  error: null,
  unit: {}
};

export default function unitReducer(state = initialState, action) {
  if( action.type === 'SET_UNITS' ) {
    return { ...state, units: action.payload }
  }
  if( action.type === 'SET_ERROR' ) {
    return { ...state, error: action.payload }
  }
  if( action.type === 'SET_LOADING' ) {
    return { ...state, loading: action.payload }
  }
  if( action.type === 'ADD_UNIT' ) {
    const newUnits = state.units.concat(action.payload)
    return { ...state, units: newUnits }
  }
  if( action.type === 'SET_UNIT' ) {
    return { ...state, unit: action.payload }
  }
  if( action.type === 'DELETE_UNIT' ) {
    const newUnits = state.units.filter(unit => unit._id !== action.payload)
    return { ...state, units: newUnits}
  }
  return state
}

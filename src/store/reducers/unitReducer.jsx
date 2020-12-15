const initialState = {
  units: [],
  loading: true,
  error: null
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
  return state
}

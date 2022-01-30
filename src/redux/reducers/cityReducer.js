import {FETCH_CITIES_REQUEST ,FETCH_CITIES_SUCCESS ,FETCH_CITIES_ERROR } from '../actions/cityActions'

const initialState = {
  cities: [],
  isFetching: false,
  error: null
}

function cities(state = initialState, action) {
  switch (action.type) {
    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cities: action.payload.cities
      }

    case FETCH_CITIES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      }

    default:
      return state
  }
}

export default cities

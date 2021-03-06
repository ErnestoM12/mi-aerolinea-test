import API from "../../services/api"

export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST'
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS'
export const FETCH_CITIES_ERROR = 'FETCH_CITIES_ERROR'

export const fetchCities = () => async (dispatch) => {

  dispatch({ type: FETCH_CITIES_REQUEST })
  try {
    const res = await API.get('/city')

    dispatch({
      type: FETCH_CITIES_SUCCESS,
      payload: {
        cities: res.data.cities
      }
    })
  } catch (error) {
    dispatch({
      type: FETCH_CITIES_ERROR,
      payload: {
        error: error.toString()
      }
    })
  }
}
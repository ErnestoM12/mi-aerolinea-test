import { ADD_RESERVATION, DELETE_ALL, DELETE_RESERVATION } from '../actions/reservationActions'



const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  reservations: cartItems
}

function reservation(state = initialState, action) {

  switch (action.type) {

    case ADD_RESERVATION:
      return {
        ...state,
        reservations: [
          action.payload,
          ...state.reservations
        ]
      }

    case DELETE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter((reservation) => {
          return reservation.localId !== action.payload.localId
        })
      }

    case DELETE_ALL:
      return {
        ...state,
        reservations: state.reservations = []
      }

    default:
      return state
  }
}

export default reservation

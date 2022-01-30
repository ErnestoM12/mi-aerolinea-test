export const ADD_RESERVATION = 'ADD_RESERVATION'
export const DELETE_RESERVATION = 'DELETE_RESERVATION'
export const DELETE_ALL = 'DELETE_ALL'


export const addReservation = (reservation) => ({
  type: ADD_RESERVATION,
  payload: reservation
})

export const deleteReservation = (reservation) => ({
  type: DELETE_RESERVATION,
  payload: reservation
})

export const deleteAll = (reservation) => ({
  type: DELETE_ALL,
  payload: reservation
})
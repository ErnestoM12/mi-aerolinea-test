import { combineReducers } from 'redux'
import cities from './cityReducer'
import reservation from './reservationReducer'
export default combineReducers({
    cities,
    reservation
    
})


import authReducer from './authReducer'
import otherReducer from './otherReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer, 
    other: otherReducer
})
export default rootReducer;
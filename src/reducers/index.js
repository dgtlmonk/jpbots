import { combineReducers } from 'redux'
import app from '../modules/app/reducers'
import qa from '../modules/qa/reducers'
import shipment from '../modules/shipment/reducers'

const rootReducer = combineReducers({
  app,
  qa,
  shipment
})

export default rootReducer

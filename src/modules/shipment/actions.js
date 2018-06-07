import { createAction } from "redux-actions";
import { REQUEST, FULFILLED, FAILED } from "./constants"

function createRequestTypes(base) {
  return [REQUEST, FULFILLED, FAILED].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export const SHIPMENT_ADD_TASK = createRequestTypes('SHIPMENT_ADD_TASK')
export const SHIPMENT_DATA_TASK = createRequestTypes('SHIPMENT_DATA_TASK')

export const actions = {
  addToShipment: createAction(SHIPMENT_ADD_TASK[REQUEST]),
  addToShipmentFulfilled: createAction(SHIPMENT_ADD_TASK[FULFILLED]),  
  setShipmentData: createAction(SHIPMENT_DATA_TASK[FULFILLED]),
};



import {createAction} from "redux-actions";
import {REQUEST, FULFILLED, FAILED} from "./constants"

function createRequestTypes(base) {
  return [REQUEST, FULFILLED, FAILED].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

/**
 * generates QA_EXTINGUISH_TASK_REQUEST, QA_EXTINGUISH_TASK_FULFILLED, QA_EXTINGUISH_TASK_FAILED
 * ... etc, accordingly
 */
export const QA_EXTINGUISH_TASK = createRequestTypes('QA_EXTINGUISH_TASK')
export const SHIPMENT_ADD_TASK = createRequestTypes('SHIPMENT_ADD_TASK')
export const SHIPMENT_DATA_TASK = createRequestTypes('SHIPMENT_DATA_TASK')
export const START_APP = createRequestTypes('START_APP')
export const STEP_TASK = createRequestTypes('STEP_TASK')
export const QA_TASK = createRequestTypes('QA_TASK')
export const RETRIEVE_BOTS = createRequestTypes('RETRIEVE_BOTS')


export const actions = {
  extinguish: createAction(QA_EXTINGUISH_TASK[REQUEST]),
  extinguishFulfilled: createAction(QA_EXTINGUISH_TASK[FULFILLED]),
  addToShipment: createAction(SHIPMENT_ADD_TASK[REQUEST]),
  addToShipmentFulfilled: createAction(SHIPMENT_ADD_TASK[FULFILLED]),
  startApp: createAction(START_APP[REQUEST]),
  startAppFulfilled: createAction(START_APP[FULFILLED]),
  moveStep: createAction(STEP_TASK[REQUEST]),
  moveStepFulfilled: createAction(STEP_TASK[FULFILLED]),
  getBotList : createAction(RETRIEVE_BOTS[REQUEST]),
  getBotListFulfilled : createAction(RETRIEVE_BOTS[FULFILLED]),
  setShipmentData : createAction(SHIPMENT_DATA_TASK[FULFILLED]),
};



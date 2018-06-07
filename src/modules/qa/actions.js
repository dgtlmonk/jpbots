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
export const QA_TASK = createRequestTypes('QA_TASK')
export const RETRIEVE_BOTS = createRequestTypes('RETRIEVE_BOTS')

export const actions = {
  extinguish: createAction(QA_EXTINGUISH_TASK[REQUEST]),
  extinguishFulfilled: createAction(QA_EXTINGUISH_TASK[FULFILLED]),
  getBotList: createAction(RETRIEVE_BOTS[REQUEST]),
  getBotListFulfilled: createAction(RETRIEVE_BOTS[FULFILLED]),
};



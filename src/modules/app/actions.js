import { createAction } from "redux-actions";
import { REQUEST, FULFILLED, FAILED } from "./constants"

function createRequestTypes(base) {
  return [REQUEST, FULFILLED, FAILED].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

/**
 * generates START_APP_TASK_REQUEST, START_APP_TASK_FULFILLED, START_APP_TASK_FAILED
 * ... etc, accordingly
 */

export const START_APP = createRequestTypes('START_APP')
export const STEP_TASK = createRequestTypes('STEP_TASK')

export const actions = {
  startApp: createAction(START_APP[REQUEST]),
  startAppFulfilled: createAction(START_APP[FULFILLED]),
  moveStep: createAction(STEP_TASK[REQUEST]),
  moveStepFulfilled: createAction(STEP_TASK[FULFILLED]),
};



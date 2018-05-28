import { fromJS } from 'immutable';
import { handleActions } from "redux-actions";
import { REQUEST, FULFILLED } from "./constants";

import {
  QA_EXTINGUISH_TASK,
  RETRIEVE_BOTS,
  STEP_TASK,
  SHIPMENT_ADD_TASK,
  SHIPMENT_DATA_TASK
} from './actions';

const InitialState = fromJS({
  qaPassed: false,
  stepStatus: {
    step: 0,
    completed: false
  },
  inventory: [],
  recycleRobots: [],
  factorySecond: [],
  passedQA: [],
  shipmentData: []
});

const qaReducer = handleActions(
  {
    [QA_EXTINGUISH_TASK[FULFILLED]]: (state = InitialState, action) => {
      return state.set("inventory", fromJS(action.payload))
                  .set("qaPassed", true)
    },
    [SHIPMENT_DATA_TASK[FULFILLED]]: (state = InitialState, action) => {
      return state.set("recycleRobots", fromJS(action.payload.recycledData))
                  .set("factorySecond", fromJS(action.payload.factorySecondData))
                  .set("passedQA", fromJS(action.payload.passedQAData))
    },
    [RETRIEVE_BOTS[FULFILLED]]: (state = InitialState, action) => {
      return state.set("inventory", fromJS(action.payload));
    },
    [SHIPMENT_ADD_TASK[FULFILLED]]: (state = InitialState, action) => {
      return state.set("shipmentData", fromJS(action.payload.data));
    },
    [STEP_TASK[REQUEST]]: (state = InitialState, action) => {
      const { next } = action.payload;
      return state.set("stepStatus", fromJS({step:next, completed: false}));
    },
    [STEP_TASK[FULFILLED]]: (state = InitialState) => {
      const { step } = state.toJS().stepStatus;

      return state.set("stepStatus", fromJS({ step, completed: true }));
    },
  },
  InitialState,
);

export default qaReducer;

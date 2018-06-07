import { fromJS } from 'immutable';
import { handleActions } from "redux-actions";
import { FULFILLED } from "./constants";

import {
  SHIPMENT_ADD_TASK,
  SHIPMENT_DATA_TASK
} from './actions';

const InitialState = fromJS({
  recycleRobots: [],
  factorySecond: [],
  passedQA: [],
  shipmentData: []
});

const shipmentReducer = handleActions(
  {
    [SHIPMENT_DATA_TASK[FULFILLED]]: (state = InitialState, action) => {
      return state.set("recycleRobots", fromJS(action.payload.recycledData))
        .set("factorySecond", fromJS(action.payload.factorySecondData))
        .set("passedQA", fromJS(action.payload.passedQAData))
    },
    [SHIPMENT_ADD_TASK[FULFILLED]]: (state = InitialState, action) => {
      return state.set("shipmentData", fromJS(action.payload.data));
    },
  },
  InitialState,
);

export default shipmentReducer;

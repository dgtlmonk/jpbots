import { fromJS } from 'immutable';
import { handleActions } from "redux-actions";
import { FULFILLED } from "./constants";

import {
  QA_EXTINGUISH_TASK,
  RETRIEVE_BOTS
} from './actions';

const InitialState = fromJS({
  qaPassed: false,
  inventory: []
});

const qaReducer = handleActions(
  {
    [QA_EXTINGUISH_TASK[FULFILLED]]: (state = InitialState, action) => {
      return state.set("inventory", fromJS(action.payload))
                  .set("qaPassed", true)
    },
    [RETRIEVE_BOTS[FULFILLED]]: (state = InitialState, action) => {
      return state.set("inventory", fromJS(action.payload));
    },
  },
  InitialState,
);

export default qaReducer;

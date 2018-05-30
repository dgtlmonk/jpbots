import { fromJS } from 'immutable';
import { handleActions } from "redux-actions";
import { REQUEST, FULFILLED } from "./constants";

import {
  STEP_TASK,
} from './actions';

const InitialState = fromJS({
  stepStatus: {
    step: 0,
    completed: false
  }
});

const appReducer = handleActions(
  {
    [STEP_TASK[REQUEST]]: (state = InitialState, action) => {
      const { next } = action.payload;
      return state.set("stepStatus", fromJS({ step: next, completed: false }));
    },
    [STEP_TASK[FULFILLED]]: (state = InitialState) => {
      const { step } = state.toJS().stepStatus;

      return state.set("stepStatus", fromJS({ step, completed: true }));
    },
  },
  InitialState,
);

export default appReducer;

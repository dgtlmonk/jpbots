
import { put, takeLatest, fork } from 'redux-saga/effects'
import { REQUEST } from './constants'
import {
  actions,
  SHIPMENT_ADD_TASK

} from './actions';

function* addShipmentTask({ payload }) {
  yield put(actions.addToShipmentFulfilled({ data: payload.data }))
}

// =====================================
//  WATCHERS
//-------------------------------------
function* watchers() {
  yield takeLatest(SHIPMENT_ADD_TASK[REQUEST], addShipmentTask)
}

export const shipmentSagas = [
  fork(watchers),
];

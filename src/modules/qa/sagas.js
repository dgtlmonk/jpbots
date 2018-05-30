
import { put, takeLatest, fork } from 'redux-saga/effects'
import { extinguishFire, RECYCLE_FILTERS, FILTER_KEY, filterBots } from 'common/utils'
import api from 'services/api'
import { actions as shipmentActions } from 'modules/shipment/actions'
import { REQUEST } from './constants'
import {
  actions,
  QA_EXTINGUISH_TASK,
  RETRIEVE_BOTS
} from './actions';


/* eslint "one-var": 0 */
function* performExtinguishTask({ payload }) {
  const extinguishedData = extinguishFire(payload.data);
  const recycledData = [],
    dataCache = {};

  let factorySecondData = [],
    passedQAData = [];

  RECYCLE_FILTERS.forEach(filter => {
    const data = filterBots(filter, extinguishedData)

    data.forEach(item => {
      dataCache[item.id] = item;
    })
  })

  // Save back to Array type for Table datasource compatibility
  Object.keys(dataCache).forEach(item => {
    recycledData.push(dataCache[item])
  })

  factorySecondData = filterBots(FILTER_KEY.LOOSE_SCREW_OR_SCRATCH_PAINT, recycledData)
  passedQAData = filterBots(FILTER_KEY.PASSED_QA, recycledData)

  yield put(actions.extinguishFulfilled({ data: extinguishedData }))
  yield put(shipmentActions.setShipmentData({ factorySecondData, passedQAData, recycledData }))
}

function * performRetrieveBotsTask(){
  const list = yield api.getList()
  yield put(actions.getBotListFulfilled({ data: list }))
}

// =====================================
//  WATCHERS
//-------------------------------------
function* watchers() {
  yield takeLatest(QA_EXTINGUISH_TASK[REQUEST], performExtinguishTask)
  yield takeLatest(RETRIEVE_BOTS[REQUEST], performRetrieveBotsTask)
}

export const qaSagas = [
  fork(watchers),
];

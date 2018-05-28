
import { put, takeLatest, fork } from 'redux-saga/effects'
import api from 'services/api'
import { extinguishFire, RECYCLE_FILTERS, FILTER_KEY, filterBots } from 'common/utils'
import {REQUEST} from './constants'
import {
  actions,
  SHIPMENT_ADD_TASK,
  QA_EXTINGUISH_TASK,
  START_APP,

} from './actions';

/* eslint "one-var": 0 */
function* performExtinguishTask({payload}) {
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

  yield put(actions.extinguishFulfilled({ data: extinguishedData}))
  yield put(actions.setShipmentData({ factorySecondData, passedQAData, recycledData}))

}

function * addShipmentTask({payload}) {
  yield put(actions.addToShipmentFulfilled({ data: payload.data }))
}

function * onAppStart() {
  const list = yield api.getList()
  yield put(actions.getBotListFulfilled({data: list}))
}

// =====================================
//  WATCHERS
//-------------------------------------
function* watchers() {
  yield takeLatest(START_APP[REQUEST], onAppStart)
  yield takeLatest(QA_EXTINGUISH_TASK[REQUEST], performExtinguishTask)
  yield takeLatest(SHIPMENT_ADD_TASK[REQUEST], addShipmentTask)
}

export const qaSagas = [
  fork(watchers),
];

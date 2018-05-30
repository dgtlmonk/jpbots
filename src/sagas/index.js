import {all} from 'redux-saga/effects'
import { qaSagas } from 'modules/qa/sagas'
import { shipmentSagas } from 'modules/shipment/sagas'


export default function * sagas() {
  yield all([
    ...qaSagas,
    ...shipmentSagas
  ]);
}

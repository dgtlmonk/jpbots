import {all} from 'redux-saga/effects'
import { qaSagas } from 'modules/qa/sagas'


export default function * sagas() {
  yield all([
    ...qaSagas
  ]);
}

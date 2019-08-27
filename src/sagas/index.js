/* eslint-disable no-constant-condition */

import { call,put, takeEvery, delay } from 'redux-saga/effects'
import {readSucces} from '../actions/index'

export function* incrementAsync() {
  yield delay(3000)
  yield put({ type: 'INCREMENT' })
}


export function* readRibbt() {
  try {
    const data = yield call(() => {
      return fetch('https://api.github.com/')
              .then(res => res.json())
      }
    );
    yield put( readSucces(data))
  } catch (error) {
    console.log('read error Ribbt')
  }
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
  yield takeEvery('READ_RIBBT', readRibbt)
}



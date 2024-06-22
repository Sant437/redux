import { all } from 'redux-saga/effects';
import watchUserActions from './userSaga';

function* rootSaga() {
  yield all([
    watchUserActions(),
  ]);
}

export default rootSaga;
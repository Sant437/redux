import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserSuccess,
  updateUserSuccess,
  deleteUserSuccess,
} from '../slices/userSlice';

function* fetchUsers() {
  try {
    const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/users');
    const data = yield response.json();
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersFailure(error.toString()));
  }
}

function* addUser(action) {
  try {
    console.log('success')
    const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(action.payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = yield response.json();
    yield put(addUserSuccess(data));
  } catch (error) {
     console.log('Failed');
  }
}

function* updateUser(action) {
  try {
    const response = yield call(fetch, `https://jsonplaceholder.typicode.com/users/${action.payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(action.payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = yield response.json();
    yield put(updateUserSuccess(data));
  } catch (error) {
    // handle error if necessary
  }
}

function* deleteUser(action) {
  try {
    console.log("Success")
    yield call(fetch, `https://jsonplaceholder.typicode.com/users/${action.payload}`, {
      method: 'DELETE',
    });
    yield put(deleteUserSuccess(action.payload));
  } catch (error) {
    console.log("Failed")
  }
}

function* watchUserActions() {
  yield takeEvery(fetchUsersStart.type, fetchUsers);
  yield takeEvery('users/addUser', addUser);
  yield takeEvery('users/updateUser', updateUser);
  yield takeEvery('users/deleteUser', deleteUser);
}

export default watchUserActions;
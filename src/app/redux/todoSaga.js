// todosSaga.js

import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { setTodos, addTodo, removeTodo, editTodo } from './todoSlice';

// Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for your Todos API
const API_ENDPOINT = 'http://localhost:3001';

// Worker Saga: Fetch todos from the API
function* fetchTodosSaga() {
    try {
        const response = yield call(axios.get, `${API_ENDPOINT}/todos`);
        yield put(setTodos(response.data));
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Worker Saga: Add a new todo to the API
function* addTodoSaga(action) {
    try {
        const response = yield call(axios.post, `${API_ENDPOINT}/todos`, { text: action.payload });
        yield put(setTodos(response.data));
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// Worker Saga: Remove a todo from the API
function* removeTodoSaga(action) {
    try {
        yield call(axios.delete, `${API_ENDPOINT}/todos/${action.payload}`);
        yield put(removeTodo(action.payload)); // Dispatching the removeTodo action locally
    } catch (error) {
        console.error('Error removing todo:', error);
    }
}

// Worker Saga: Edit a todo in the API
function* editTodoSaga(action) {
    try {
        yield call(axios.put, `${API_ENDPOINT}/todos/${action.payload.id}`, { text: action.payload.text });
        yield put(editTodo(action.payload)); // Dispatching the editTodo action locally
    } catch (error) {
        console.error('Error editing todo:', error);
    }
}

// Watcher Saga: Watch for actions and run the corresponding worker saga
function* todosSaga() {
    yield takeEvery(FETCH_TODOS, fetchTodosSaga);
    yield takeEvery(ADD_TODO, addTodoSaga);
    yield takeEvery(REMOVE_TODO, removeTodoSaga);
    yield takeEvery(EDIT_TODO, editTodoSaga);
}

export default todosSaga;

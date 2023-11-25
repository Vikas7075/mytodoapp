import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
    },
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
        addTodo: (state, action) => {
            state.todos.push({
                id: Date.now(),
                text: action.payload,
                createdAt: new Date(Date.now()),
            });
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        editTodo: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            state.todos[index].text = action.payload.text;
        },
        completeTodo: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);
            state.todos[index].completed = !state.todos[index].completed;
        },
    },
});

export const { setTodos, addTodo, removeTodo, editTodo, completeTodo } = todosSlice.actions;

export default todosSlice.reducer;

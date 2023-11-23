import { createSlice } from '@reduxjs/toolkit';


export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
    },
    reducers: {
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
    },
});

export const { addTodo, removeTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;

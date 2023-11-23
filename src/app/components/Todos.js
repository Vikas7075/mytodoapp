'use client'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, editTodo } from '../redux/todoSlice';
import moment from 'moment';

export default function Home() {
    const { todos } = useSelector((store) => store.todos);
    const dispatch = useDispatch();
    const [currentFilter, setCurrentFilter] = useState('All');
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            dispatch(addTodo(newTodo));
            setNewTodo('');
        }
    };

    const handleRemoveTodo = (id) => {
        dispatch(removeTodo(id));
    };

    const handleEditTodo = (id, text) => {
        dispatch(editTodo({ id, text }));
    };

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
    };

    const filteredTodos = todos.filter((todo) => {
        if (currentFilter === 'All') {
            return true;
        } else if (currentFilter === 'Completed') {
            return todo.completed;
        } else {
            return !todo.completed;
        }
    });

    return (
        <div className="container w-[90%] md:w-[50%] m-auto">
            <h1 className="text-3xl font-bold mt-10 mb-8 text-center border bg-green-500 rounded-lg">Todo List</h1>
            <div className="flex mb-4 mx-auto">
                <input
                    type="text"
                    className="border rounded-lg border-gray-400 w-full mr-2 py-1 px-3 focus:outline-none dark:bg-darkVddBlue dark:text-darkLgBlue'"
                    placeholder="Create a todo..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-[14px]"
                    onClick={handleAddTodo}
                >
                    Add Todo
                </button>
            </div>
            <ul className="list-disc pl-4">
                {filteredTodos.map((todo) => (
                    <li key={todo.id} className="mb-2">
                        <span className="mr-2 font-semibold">{todo.text}</span>
                        <span className="text-gray-500 text-sm">{moment(todo.createdAt).isValid() ? moment(todo.createdAt).fromNow() : 'Invalid date'}</span>
                        <div className="float-right">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                                onClick={() => handleEditTodo(todo.id, prompt('Enter new text', todo.text))}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                onClick={() => handleRemoveTodo(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <button
                    className={`${currentFilter === 'All' ? 'bg-blue-500' : 'bg-gray-300'
                        } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l`}
                    onClick={() => handleFilterChange('All')}
                >
                    All
                </button>
                <button
                    className={`${currentFilter === 'Active' ? 'bg-blue-500' : 'bg-gray-300'
                        } hover:bg-blue-700 text-white font-bold py-2 px-4`}
                    onClick={() => handleFilterChange('Active')}
                >
                    Active
                </button>
                <button
                    className={`${currentFilter === 'Completed' ? 'bg-blue-500' : 'bg-gray-300'
                        } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r`}
                    onClick={() => handleFilterChange('Completed')}
                >
                    Completed
                </button>
            </div>
        </div>
    );
}

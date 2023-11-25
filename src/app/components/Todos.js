//'use client'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, editTodo, completeTodo } from '../redux/todoSlice';
import moment from 'moment';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


export default function Home({ }) {
    const { todos } = useSelector((store) => store.todos);
    const dispatch = useDispatch();
    const [currentFilter, setCurrentFilter] = useState('All');
    const [newTodo, setNewTodo] = useState();

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            dispatch(addTodo(newTodo));
            setNewTodo('');
        }
    };

    const toggleTodo = (id) => {
        dispatch(completeTodo(id));
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
            <h1 className="text-3xl font-semibold p-3 mt-2 mb-8 text-center text-black border bg-cyan-500 rounded-lg">Todo List</h1>
            <div className="flex mb-4 mx-auto">

                <input
                    type="text"
                    className="border rounded-box border-gray-400 w-full mr-2 py-1 px-3 focus:outline-none dark:bg-darkVddBlue dark:text-darkLgBlue'"
                    placeholder="Create a todo..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    className=" bg-cyan-500 hover:bg-cyan-700 text-black font-semibold py-3 px-3 rounded-full text-[14px]"
                    onClick={handleAddTodo}
                >
                    <AddIcon />
                </button>
            </div>
            <div className="list-disc pl-4">
                <div className=' flex-col mb-4'>
                    <h2 className=' font-extrabold p-0'>Today</h2>
                    <p1 className=' text-xs p-0 font-bold'>{new Date(Date.now()).toDateString()}</p1>
                </div>
                {filteredTodos.map((todo) => (
                    <div key={todo.id} className="mb-2">

                        <div className='space-x-1 inline-flex'>
                            <input
                                className='checkbox checkbox-md rounded-full'
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <span
                                className=' text-sm font-semibold'
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.text}
                            </span>


                            {/* <span className="mr-2 font-semibold">{todo.text}</span> */}

                            <span className="text-gray-500 text-sm">{moment(todo.createdAt).isValid() ? moment(todo.createdAt).toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Invalid date'}</span>
                        </div>
                        <div className=" float-right">
                            <button

                                onClick={() => handleEditTodo(todo.id, prompt('Enter new text', todo.text))}
                            >
                                <EditIcon color='primary' />
                            </button>
                            <button

                                onClick={() => handleRemoveTodo(todo.id)}
                            >
                                <DeleteIcon color='action' />
                            </button>
                        </div>

                    </div>
                ))}
            </div>
            <div>
                <button
                    className={`${currentFilter === 'All' ? 'bg-blue-500' : 'bg-gray-300'
                        } hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-l`}
                    onClick={() => handleFilterChange('All')}
                >
                    All
                </button>
                <button
                    className={`${currentFilter === 'Active' ? ' bg-green-500' : 'bg-gray-300'
                        } hover:bg-blue-700 text-white font-bold py-1 px-2`}
                    onClick={() => handleFilterChange('Active')}
                >
                    Active
                </button>
                <button
                    className={`${currentFilter === 'Completed' ? 'bg-orange-400' : 'bg-gray-300'
                        } hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-r`}
                    onClick={() => handleFilterChange('Completed')}
                >
                    Completed
                </button>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('/api/todos'); // This will call your API route
        const todos = response.data.todos;

        return {
            props: { todos },
        };
    } catch (error) {
        console.error('Error fetching todos:', error);
        return {
            props: { todos: [] }, // Set an empty array or handle the error appropriately
        };
    }
}
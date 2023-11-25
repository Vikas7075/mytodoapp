import axios from 'axios';

export default async function handler(req, res) {
    try {
        const response = await axios.get('http://localhost:3001/todos');
        const todos = response.data;

        res.status(200).json({ todos });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

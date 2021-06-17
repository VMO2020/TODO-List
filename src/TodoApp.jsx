import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TodoList } from './components/TodoList';
import './todoapp.scss';

const KEY = 'simpleTodoList';

export const TodoApp = () => {
	const [todos, setTodos] = useState([{}]);
	const [todo, setTodo] = useState('');

	useEffect(() => {
		const data = localStorage.getItem(KEY) || 'Empty';
		data === 'Empty' ? console.log(data) : setTodos(JSON.parse(data));
	}, []);

	useEffect(() => {
		localStorage.setItem(KEY, JSON.stringify(todos));
		// console.log('Stored');
	}, [todos]);

	const handleChange = (e) => {
		setTodo(e.target.value);
		// console.log(e.target.value);
	};

	const handleAddTodo = () => {
		if (todo === '') return;
		// console.log('todo: ', todo);
		let task = todo;
		let newTodo = { id: uuid(), task, completed: false };
		// console.log('New todo: ', newTodo);
		let newTodos = [...todos];
		newTodos.push(newTodo);
		setTodos(newTodos);
		setTodo('');
		// console.log('todos: ', todos);
	};

	const handleDelete = () => {
		let newTodos = [...todos];
		let filterTodos = newTodos.filter((todo) => todo.completed === false);
		// console.log(filterTodos);
		setTodos(filterTodos);
	};

	return (
		<div className='container'>
			<h1>TODO List App</h1>
			<input
				type='text'
				className='newtodo'
				value={todo}
				onChange={handleChange}
				placeholder='Add New Todo'
			/>
			<br />
			<button className='btn' onClick={handleAddTodo}>
				✏️
			</button>
			<button className='btn' onClick={handleDelete}>
				🗑
			</button>
			<hr />
			<TodoList todos={todos} setTodos={setTodos} />
		</div>
	);
};

import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TodoList } from './components/TodoList';
import { ReactComponent as Icon1 } from './assets/filter_list_24dp.svg';
import './todoapp.scss';

const KEY = 'simpleTodoList';

export const TodoApp = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState('');
	const [sorted, setSorted] = useState(false);

	useEffect(() => {
		const data = localStorage.getItem(KEY);
		if (data) {
			setTodos(JSON.parse(data));
		}
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

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleAddTodo(e);
		}
	};

	return (
		<div className='container'>
			<div className='container___top'>
				<h1>ToDo List</h1>
				<button
					className='sort'
					onClick={() => setSorted(!sorted)}
					style={sorted ? { fill: 'orange' } : { fill: 'white' }}
				>
					<Icon1 />
				</button>
				<input
					type='text'
					className='newtodo'
					value={todo}
					onChange={handleChange}
					placeholder='Add New Todo'
					onKeyDown={handleKeyDown}
				/>
				<br />
				<div className='container___top-control'>
					<div>
						<button className='btn' onClick={handleAddTodo}>
							✏️
						</button>
						<button className='btn' onClick={handleDelete}>
							🗑
						</button>
					</div>

					<span className='tasks'>
						{`Pending Tasks: `}
						<b className='tasks__record'>{`${
							todos.filter((todo) => !todo.completed).length
						}`}</b>
					</span>
				</div>
				<div className='tasks-title'>
					<h4>Tasks</h4>
				</div>
			</div>

			<TodoList todos={todos} setTodos={setTodos} sorted={sorted} />

			<br />
			<footer>
				<a href='https://vmog.net/' target='_blank' rel='noreferrer'>
					Copyright and design © VMOG
				</a>
			</footer>
		</div>
	);
};

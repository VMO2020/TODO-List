import React, { useState } from 'react';
import './todoitem.scss';

import { ReactComponent as Icon1 } from '../assets/done_outline.svg';
import { ReactComponent as Icon2 } from '../assets/crop_square.svg';

export const TodoItem = ({ todo, todos, setTodos }) => {
	const [update, setUpdate] = useState(false);

	const handleToggle = () => {
		// console.log(todo.completed);
		let newTodos = [...todos];
		const todoItem = newTodos.find((item) => todo.id === item.id);
		// console.log(todoItem);
		todoItem.completed = !todoItem.completed;
		// console.log(newTodos);
		setTodos(newTodos);
	};

	const handleUpdate = () => {
		setUpdate(!update);
	};

	const handleChange = (e) => {
		if (e.target.value === '') return;
		let newTodos = [...todos];
		const todoItem = newTodos.find((item) => todo.id === item.id);
		todoItem.task = e.target.value;
		setTodos(newTodos);
	};

	const handleEdit = () => {
		setUpdate(false);
	};

	const handleDelete = () => {
		let newTodos = [...todos];
		const filterTodos = newTodos.filter((item) => todo.id !== item.id);
		setTodos(filterTodos);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleEdit(e);
		}
	};

	return (
		<div className='todolist__item'>
			<label htmlFor={todo.id}>
				{todo.completed ? (
					<Icon1 style={{ fill: 'green' }} />
				) : (
					<Icon2 style={{ fill: 'grey' }} />
				)}
			</label>
			<input
				type='checkbox'
				id={todo.id}
				className='checkbox'
				onClick={handleToggle}
			/>

			{!update && (
				<li className='item' onClick={handleUpdate}>
					{todo.task}
				</li>
			)}

			{update && (
				<div>
					<input
						className='todolist__item-input'
						onChange={handleChange}
						value={todo.task}
						id='todo-task'
						onKeyDown={handleKeyDown}
					/>
					<button className='btn' onClick={handleEdit}>
						💾
					</button>
					<button className='btn' onClick={handleDelete}>
						🗑
					</button>
				</div>
			)}
		</div>
	);
};

import React, { useState } from 'react';
import './todoitem.scss';

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
		let newTodos = [...todos];
		const todoItem = newTodos.find((item) => todo.id === item.id);
		todoItem.task = e.target.value;
		setTodos(newTodos);
	};

	const handleEdit = () => {
		setUpdate(false);
	};

	return (
		<div className='todolist__item'>
			<input type='checkbox' className='checkbox' onClick={handleToggle} />
			{!update && (
				<li className='item' onClick={handleUpdate}>
					{todo.task}
				</li>
			)}

			{update && (
				<div>
					<input onChange={handleChange} placeholder={todo.task} />
					<button className='btn' onClick={handleEdit}>
						🖌
					</button>
				</div>
			)}
		</div>
	);
};

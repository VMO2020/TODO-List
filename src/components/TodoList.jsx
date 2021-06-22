import React from 'react';
import { TodoItem } from '../components/TodoItem';
import './todolist.scss';

export const TodoList = ({ todos, setTodos }) => {
	return (
		<div className='todolist'>
			<ul>
				{todos.map(
					(todo, i) =>
						!todo.completed && (
							<TodoItem
								key={`${todo.id}-${i}`}
								todo={todo}
								todos={todos}
								setTodos={setTodos}
							/>
						)
				)}
			</ul>
			<div className='readyTasks'>
				{todos.filter((todo) => todo.completed).length > 0 && (
					<h4>Ready Tasks</h4>
				)}
			</div>
			<ul className='readyTasks__list'>
				{todos.map(
					(todo, i) =>
						todo.completed && (
							<TodoItem
								key={`${todo.id}-${i}`}
								todo={todo}
								todos={todos}
								setTodos={setTodos}
							/>
						)
				)}
			</ul>
		</div>
	);
};

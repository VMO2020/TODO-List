import React from 'react';
import { TodoItem } from '../components/TodoItem';
import './todolist.scss';

export const TodoList = ({ scroll, todos, setTodos, sorted, store }) => {
	const newTodos = [...todos];
	function compareTasks(a, b) {
		if (a.task < b.task) {
			return -1;
		}
		if (a.task > b.task) {
			return 1;
		}
		return 0;
	}

	const sortedTodos = newTodos.sort(compareTasks);
	// console.log(sortedTodos);

	return (
		<div className='todolist'>
			<span ref={scroll}></span>
			{todos.filter((todo) => !todo.completed).length > 0 && (
				<h4 id='toplist'>{store ? 'To buy' : 'Tasks'}</h4>
			)}

			<ul>
				{(sorted ? sortedTodos : todos).map(
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
					<h4>{store ? 'Products' : 'Ready Tasks'}</h4>
				)}
			</div>
			<ul className='readyTasks__list'>
				{(sorted ? sortedTodos : todos).map(
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

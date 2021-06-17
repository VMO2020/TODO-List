import React from 'react';
import { TodoItem } from '../components/TodoItem';
import './todolist.scss';

export const TodoList = ({ todos, setTodos }) => {
	return (
		<div className='todolist'>
			<ul>
				{todos.map((todo, i) => (
					<TodoItem
						key={`${todo.id}-${i}`}
						todo={todo}
						todos={todos}
						setTodos={setTodos}
					/>
				))}
			</ul>
		</div>
	);
};

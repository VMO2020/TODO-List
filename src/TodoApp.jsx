import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';

// Components
import { TodoList } from './components/TodoList';

// Icons
import { ReactComponent as Filter } from './assets/filter_list.svg';
import { ReactComponent as Delete } from './assets/delete.svg';
import { ReactComponent as Arrow } from './assets/arrow_upward.svg';
import { ReactComponent as Store } from './assets/store.svg';
import { ReactComponent as Task } from './assets/task.svg';

// Styles
import './todoapp.scss';

// Local storage names
const KEY = 'simpleTodoList';
const PREF = 'preferTodoList';

export const TodoApp = () => {
	const [todos, setTodos] = useState([]);
	const [search, setSearch] = useState('');
	const [todo, setTodo] = useState('');
	const [userPreferences, setUserPreferences] = useState({
		storeUser: false,
		sortedUser: false,
	});
	const [sorted, setSorted] = useState(false);
	const [store, setStore] = useState(false);
	const [clear, setClear] = useState(false);

	const scroll = useRef();

	// SEARCH FUNCTION
	const searcher = (e) => {
		setSearch(e.target.value);
		//console.log(e.target.value)
	};

	// FILTER FUNCTION
	let results = !search
		? todos
		: todos.filter((todo) =>
				todo.task.toLowerCase().startsWith(search.toLowerCase())
		  );
	// console.log(results);

	const handleChange = (e) => {
		setTodo(e.target.value);
		setSearch('');
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
		scrollToTop();
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

	const scrollToTop = () => {
		// Scroll to the end using useRef to Ref=scroll
		scroll.current.scrollIntoView({ behavior: 'smooth' });
		toggleFullScreen();
	};

	const handleStore = () => {
		setStore(!store);
		setUserPreferences({
			...userPreferences,
			storeUser: !store,
		});
	};

	const handleSorted = () => {
		setSorted(!sorted);
		setUserPreferences({
			...userPreferences,
			sortedUser: !sorted,
		});
	};

	function toggleFullScreen() {
		if (!document.fullscreenElement) {
			openFullscreen();
		}
	}

	// View in fullscreen
	function openFullscreen() {
		// Get the documentElement (<html>) to display the page in fullscreen */
		const elem = document.documentElement;

		if (elem.requestFullscreen) {
			// Full screen
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			// Full screen in Firefox
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			// Full screen in Chrome, Safari y Opera
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			// Full screen in IE11 y Edge
			elem.msRequestFullscreen();
		}
	}

	useEffect(() => {
		const data = localStorage.getItem(KEY);
		if (data) {
			setTodos(JSON.parse(data));
		}
	}, []);

	useEffect(() => {
		const userPref = JSON.parse(localStorage.getItem(PREF));
		// console.log('User Pref:', userPref);
		if (userPref) {
			setUserPreferences(userPref);
			setStore(userPref.storeUser);
			setSorted(userPref.sortedUser);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(KEY, JSON.stringify(todos));
		// console.log('Todos Stored');
	}, [todos]);

	useEffect(() => {
		localStorage.setItem(PREF, JSON.stringify(userPreferences));
		// console.log('UserPreferences Stored');
	}, [userPreferences]);

	return (
		<div className='container'>
			<div className='container___top'>
				<h1>{store ? 'ShoppingList' : 'ToDoList'}</h1>
				<button
					className='clear'
					onClick={() => setClear(!clear)}
					style={clear ? { fill: 'orange' } : { fill: 'white' }}
				>
					<Delete />
				</button>
				{store ? (
					<button
						className='store'
						onClick={handleStore}
						style={{ fill: 'white' }}
					>
						<Task />
					</button>
				) : (
					<button
						className='task'
						onClick={handleStore}
						style={{ fill: 'white' }}
					>
						<Store />
					</button>
				)}

				<button
					className='sort'
					onClick={handleSorted}
					style={sorted ? { fill: 'orange' } : { fill: 'white' }}
				>
					<Filter />
				</button>
				{todos.length > 12 && (
					<button
						className='backTop'
						onClick={scrollToTop}
						style={{ fill: 'orange' }}
					>
						<Arrow />
					</button>
				)}

				<input
					type='text'
					className='newtodo'
					value={todo}
					onChange={handleChange}
					placeholder={store ? 'Add New Product' : 'Add New Todo'}
					onKeyDown={handleKeyDown}
				/>
				<br />
				<div className='container___top-control'>
					<div>
						<button className='btn' onClick={handleAddTodo}>
							✏️
						</button>
						{todo && (
							<button className='btn' onClick={() => setTodo('')}>
								🗑
							</button>
						)}
						{clear && (
							<button className='btn' onClick={handleDelete}>
								🗑
							</button>
						)}
					</div>

					<div className='search-container'>
						<input
							value={search}
							onChange={searcher}
							type='text'
							placeholder='Search...'
							className='search'
						/>
						{search && (
							<button className='btn' onClick={() => setSearch('')}>
								🗑
							</button>
						)}
					</div>
				</div>
			</div>

			<TodoList
				scroll={scroll}
				todos={todos}
				setTodos={setTodos}
				sorted={sorted}
				store={store}
				results={results}
			/>

			<br />
			<footer>
				<a href='https://vmog.net/' target='_blank' rel='noreferrer'>
					Copyright and design © VMOG
				</a>
			</footer>
		</div>
	);
};

import React from 'react';
import ReactDOM from 'react-dom';

import { TodoApp } from '../TodoApp';

describe('<TodoApp /> test collection', () => {
	test('Component rendering without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<TodoApp />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});

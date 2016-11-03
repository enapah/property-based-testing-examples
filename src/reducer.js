const {ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, CLEAR_COMPLETED} = require('./action-types');

const initialState = [];

module.exports = function todos(state = initialState, action) {
	switch (action.type) {
		case ADD_TODO:
			const todo = {
				id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
				text: action.text,
				completed: false
			};

			return [todo].concat(state);

		case DELETE_TODO:
			return state.filter(todo => todo.id !== action.id);

		case EDIT_TODO:
			return state.map(todo =>
				todo.id === action.id ?
					Object.assign({}, todo, {text: action.text}) :
					todo
			);

		case COMPLETE_TODO:
			return state.map(todo =>
				todo.id === action.id ?
					Object.assign({}, todo, {completed: !todo.completed}) :
					todo
			);

		case CLEAR_COMPLETED:
			return state.filter(todo => todo.completed === false);

		default:
			return state
	}
};

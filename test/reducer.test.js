const deepFreeze = require('deep-freeze');
const jsverify = require('jsverify');
const reducer = require('../src/reducer');
const {ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, CLEAR_COMPLETED} = require('../src/action-types');

const arbitraryActionType = jsverify.elements([ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, CLEAR_COMPLETED]);

const arbitraryTodo = jsverify.record({
	id: jsverify.nat,
	text: jsverify.asciistring,
	completed: jsverify.bool
});

const arrayOfTodos = jsverify.array(arbitraryTodo);

describe('reducer', () => {
	describe('given any action', () => {
		property('does not modify the current state', arrayOfTodos, arbitraryActionType, (state, type) => {
			reducer(deepFreeze(state), {type});
		});
	});

	describe(`on action ${CLEAR_COMPLETED}`, () => {
		property('removes completed todos', arrayOfTodos, (state) => {
			const newState = reducer(state, {type: CLEAR_COMPLETED});

			assert.isTrue(newState.every(todo => !todo.completed));
		});
	});
});

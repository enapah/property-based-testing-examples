const add = require('../src/add');

describe('add', () => {
	property('is a function', () => {
		assert.isFunction(add);
	});

	property('accepts two parameters', () => {
		assert.lengthOf(add, 2);
	});

	describe('when adding zero to a number', () => {
		property('returns the number', 'integer', number => {
			assert.equal(add(number, 0), number);
		});
	});

	describe('when adding two numbers', () => {
		property('returns a number', 'integer', 'integer', (a, b) => {
			assert.isNumber(add(a, b));
		});

		property('the order of the parameters does not matter', 'integer', 'integer', (a, b) => {
			const aPlusB = add(a, b),
			      bPlusA = add(b, a);

			assert.equal(aPlusB, bPlusA);
		});
	});

	describe('when adding three numbers', () => {
		property('the order of the operations does not matter', 'integer', 'integer', 'integer', (a, b, c) => {
			const result1 = add(a, add(b, c)),
			      result2 = add(add(a, b), c);

			assert.equal(result1, result2);
		});
	});
});

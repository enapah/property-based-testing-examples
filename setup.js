const jsverify = require('jsverify'),
      assert   = require('chai').assert;

const alwaysReturnTrue = array => {
	const testMethod = array[array.length - 1];

	array.splice(-1, 1, (...args) => {
		testMethod(...args);

		return true;
	});
};

const property = (...args) => {
	alwaysReturnTrue(args);

	jsverify.property(...args);
};

global.assert = assert;
global.property = property;
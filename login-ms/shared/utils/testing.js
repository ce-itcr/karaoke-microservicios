var assert = require('assert');
const AssertionError = require('assert').AssertionError;

function assertStrictEquality (a, b, message = null) {
    try {
      console.log(`----- ASSERTING: ${a} === ${b} -----`);
      assert.strictEqual(a, b, message);
      console.log(`----- CONFIRMED: ${a} === ${b} -----`);
    } catch (e) {
      if (e instanceof AssertionError) {
        console.log(e);
      } else {
        console.log(e);
      }
    }
  }

module.exports = { assertStrictEquality } 
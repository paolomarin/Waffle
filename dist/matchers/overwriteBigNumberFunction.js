'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ethers = require('ethers');

var overwriteBigNumberFunction = function overwriteBigNumberFunction(functionName, readableName, _super, chaiUtils) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var actual = args[0];

    var expected = chaiUtils.flag(this, 'object');
    if (_ethers.utils.BigNumber.isBigNumber(expected)) {
      this.assert(expected[functionName](actual), 'Expected "' + expected + '" to be ' + readableName + ' ' + actual, 'Expected "' + expected + '" NOT to be ' + readableName + ' ' + actual, expected, actual);
    } else if (_ethers.utils.BigNumber.isBigNumber(actual)) {
      this.assert(actual[functionName](expected), 'Expected "' + expected + '" to be ' + readableName + ' ' + actual, 'Expected "' + expected + '" NOT to be ' + readableName + ' ' + actual, expected, actual);
    } else {
      _super.apply(this, args);
    }
  };
};

exports.default = overwriteBigNumberFunction;
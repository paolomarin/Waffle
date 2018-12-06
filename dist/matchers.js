'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overwriteBigNumberFunction = require('./matchers/overwriteBigNumberFunction');

var _overwriteBigNumberFunction2 = _interopRequireDefault(_overwriteBigNumberFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var solidity = function solidity(chai, utils) {
  var Assertion = chai.Assertion;


  Assertion.overwriteMethod('equal', function (_super) {
    return (0, _overwriteBigNumberFunction2.default)('eq', 'equal', _super, utils);
  });
  Assertion.overwriteMethod('eq', function (_super) {
    return (0, _overwriteBigNumberFunction2.default)('eq', 'equal', _super, utils);
  });
  Assertion.overwriteMethod('above', function (_super) {
    return (0, _overwriteBigNumberFunction2.default)('gt', 'above', _super, utils);
  });
  Assertion.overwriteMethod('below', function (_super) {
    return (0, _overwriteBigNumberFunction2.default)('lt', 'below', _super, utils);
  });
  Assertion.overwriteMethod('least', function (_super) {
    return (0, _overwriteBigNumberFunction2.default)('gte', 'at least', _super, utils);
  });
  Assertion.overwriteMethod('most', function (_super) {
    return (0, _overwriteBigNumberFunction2.default)('lte', 'at most', _super, utils);
  });

  Assertion.addProperty('reverted', function () {
    var _this = this;

    /* eslint-disable no-underscore-dangle */
    var promise = this._obj;
    var derivedPromise = promise.then(function (value) {
      _this.assert(false, 'Expected transaction to be reverted', 'Expected transaction NOT to be reverted', 'not reverted', 'reverted');
      return value;
    }, function (reason) {
      _this.assert(reason.toString().search('revert') >= 0, 'Expected transaction to be reverted, but other exception was thrown: ' + reason, 'Expected transaction NOT to be reverted', 'Reverted', reason);
      return reason;
    });
    this.then = derivedPromise.then.bind(derivedPromise);
    this.catch = derivedPromise.catch.bind(derivedPromise);
    return derivedPromise;
  });

  Assertion.addMethod('revertedWith', function (revertReason) {
    var _this2 = this;

    /* eslint-disable no-underscore-dangle */
    var promise = this._obj;
    var derivedPromise = promise.then(function (value) {
      _this2.assert(false, 'Expected transaction to be reverted', 'Expected transaction NOT to be reverted', 'not reverted', 'reverted');
      return value;
    }, function (reason) {
      _this2.assert(reason.toString().search('revert') >= 0 && reason.toString().search(revertReason) >= 0, 'Expected transaction to be reverted with ' + revertReason + ', but other exception was thrown: ' + reason, 'Expected transaction NOT to be reverted with ' + revertReason, 'Reverted', reason);
      return reason;
    });
    this.then = derivedPromise.then.bind(derivedPromise);
    this.catch = derivedPromise.catch.bind(derivedPromise);
    return derivedPromise;
  });

  var filterLogsWithTopics = function filterLogsWithTopics(logs, topic) {
    return logs.filter(function (log) {
      return log.topics.includes(topic);
    });
  };

  Assertion.addMethod('emit', function (contract, eventName) {
    var _this3 = this;

    /* eslint-disable no-underscore-dangle */
    var promise = this._obj;
    var derivedPromise = promise.then(function (tx) {
      return contract.provider.getTransactionReceipt(tx.hash);
    }).then(function (receipt) {
      var topic = contract.interface.events[eventName].topic;

      _this3.logs = filterLogsWithTopics(receipt.logs, topic);
      if (_this3.logs.length < 1) {
        _this3.assert(false, 'Expected event "' + eventName + '" to emitted, but wasn\'t', 'Expected event "' + eventName + '" NOT to emitted, but it was', eventName, '');
      }
    });
    this.then = derivedPromise.then.bind(derivedPromise);
    this.catch = derivedPromise.catch.bind(derivedPromise);
    this.promise = derivedPromise;
    this.contract = contract;
    this.eventName = eventName;
    return this;
  });

  var assertArgsArraysEqual = function assertArgsArraysEqual(context, expectedArgs, actualArgs) {
    context.assert(actualArgs.length === expectedArgs.length, 'Expected "' + context.eventName + '" event to have ' + expectedArgs.length + ' argument(s), but has ' + actualArgs.length, 'Do not combine .not. with .withArgs()', expectedArgs.length, actualArgs.length);
    for (var index = 0; index < expectedArgs.length; index++) {
      new chai.Assertion(expectedArgs[index]).equal(actualArgs[index]);
    }
  };

  Assertion.addMethod('withArgs', function () {
    var _this4 = this;

    for (var _len = arguments.length, expectedArgs = Array(_len), _key = 0; _key < _len; _key++) {
      expectedArgs[_key] = arguments[_key];
    }

    var derivedPromise = this.promise.then(function () {
      var actualArgs = _this4.contract.interface.parseLog(_this4.logs[0]);
      assertArgsArraysEqual(_this4, expectedArgs, actualArgs.values);
    });
    this.then = derivedPromise.then.bind(derivedPromise);
    this.catch = derivedPromise.catch.bind(derivedPromise);
    return this;
  });

  Assertion.addProperty('properAddress', function () {
    /* eslint-disable no-underscore-dangle */
    var subject = this._obj;
    this.assert(/^0x[0-9-a-fA-F]{40}$/.test(subject), 'Expected "' + subject + '" to be a proper address', 'Expected "' + subject + '" not to be a proper address', 'proper address (eg.: 0x1234567890123456789012345678901234567890)', subject);
  });

  Assertion.addProperty('properPrivateKey', function () {
    /* eslint-disable no-underscore-dangle */
    var subject = this._obj;
    this.assert(/^0x[0-9-a-fA-F]{64}$/.test(subject), 'Expected "' + subject + '" to be a proper private key', 'Expected "' + subject + '" not to be a proper private key', 'proper address (eg.: 0x1234567890123456789012345678901234567890)', subject);
  });

  Assertion.addMethod('properHex', function (length) {
    /* eslint-disable no-underscore-dangle */
    var subject = this._obj;
    var regexp = new RegExp('^0x[0-9-a-fA-F]{' + length + '}$');
    this.assert(regexp.test(subject), 'Expected "' + subject + '" to be a proper hex of length ' + length, 'Expected "' + subject + '" not to be a proper hex of length ' + length + ', but it was', 'proper address (eg.: 0x1234567890123456789012345678901234567890)', subject);
  });
};

exports.default = solidity;
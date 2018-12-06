'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWarningMessage = exports.eventParseResultToArray = exports.isPositiveIntegerString = exports.readFileContent = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFileContent = exports.readFileContent = function readFileContent(path) {
  return _fs2.default.readFileSync(path).toString();
};

var isPositiveIntegerString = exports.isPositiveIntegerString = function isPositiveIntegerString(string) {
  return (/^\d+$/.test(string)
  );
};

var eventParseResultToArray = exports.eventParseResultToArray = function eventParseResultToArray(eventResult) {
  return Object.keys(eventResult).filter(isPositiveIntegerString).map(function (key) {
    return eventResult[key];
  });
};

var isWarningMessage = exports.isWarningMessage = function isWarningMessage(error) {
  return (/: Warning: /.test(error)
  );
};
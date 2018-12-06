'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compile = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var compile = exports.compile = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(configPath) {
    var config, contents, compiler;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            config = {};

            if (configPath) {
              contents = _fs2.default.readFileSync(configPath);

              config = JSON.parse(contents);
            }
            compiler = new Compiler(config);
            _context6.next = 6;
            return compiler.compile();

          case 6:
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](0);

            console.error(_context6.t0);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[0, 8]]);
  }));

  return function compile(_x3) {
    return _ref7.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _solc = require('solc');

var _solc2 = _interopRequireDefault(_solc);

var _defaultConfig = require('./config/defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Compiler = function () {
  function Compiler() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Compiler);

    this.config = (0, _extends3.default)({}, _defaultConfig2.default, config);
    this.console = console;
    this.process = process;
  }

  (0, _createClass3.default)(Compiler, [{
    key: 'findInputFiles',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var dirs, inputFiles, dir, files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, filePath, stat;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dirs = [this.config.sourcesPath];
                inputFiles = [];

              case 2:
                if (!dirs.length) {
                  _context.next = 36;
                  break;
                }

                dir = dirs.pop();
                files = _fs2.default.readdirSync(dir);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 8;
                _iterator = files[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 20;
                  break;
                }

                file = _step.value;
                filePath = _path2.default.join(dir, file);
                _context.next = 15;
                return _fs2.default.statSync(filePath);

              case 15:
                stat = _context.sent;

                if (stat.isDirectory(filePath)) {
                  dirs.push(filePath);
                } else if (file.endsWith('.sol')) {
                  inputFiles.push(filePath);
                }

              case 17:
                _iteratorNormalCompletion = true;
                _context.next = 10;
                break;

              case 20:
                _context.next = 26;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context['catch'](8);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 26:
                _context.prev = 26;
                _context.prev = 27;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 29:
                _context.prev = 29;

                if (!_didIteratorError) {
                  _context.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return _context.finish(29);

              case 33:
                return _context.finish(26);

              case 34:
                _context.next = 2;
                break;

              case 36:
                return _context.abrupt('return', inputFiles);

              case 37:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 22, 26, 34], [27,, 29, 33]]);
      }));

      function findInputFiles() {
        return _ref.apply(this, arguments);
      }

      return findInputFiles;
    }()
  }, {
    key: 'findInputs',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var files;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.findInputFiles(this.config);

              case 2:
                files = _context2.sent;
                return _context2.abrupt('return', Object.assign.apply(Object, (0, _toConsumableArray3.default)(files.map(function (file) {
                  return (0, _defineProperty3.default)({}, file, (0, _utils.readFileContent)(file));
                }))));

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findInputs() {
        return _ref2.apply(this, arguments);
      }

      return findInputs;
    }()
  }, {
    key: 'findImports',
    value: function findImports(file) {
      var libPath = _path2.default.join(this.config.npmPath, file);
      if (_fs2.default.existsSync(file)) {
        var contents = _fs2.default.readFileSync(file).toString();
        return { contents: contents };
      } else if (_fs2.default.existsSync(libPath)) {
        var _contents = _fs2.default.readFileSync(libPath).toString();
        return { contents: _contents };
      }
      return { error: 'File not found: ' + file };
    }
  }, {
    key: 'doCompile',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var sources;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.findInputs();

              case 2:
                sources = _context3.sent;
                return _context3.abrupt('return', _solc2.default.compile({ sources: sources }, 1, this.findImports.bind(this)));

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function doCompile() {
        return _ref4.apply(this, arguments);
      }

      return doCompile;
    }()
  }, {
    key: 'saveOutput',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(output) {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, key, _key$split, _key$split2, fileName, filePath, dirPath, content;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context4.prev = 3;

                for (_iterator2 = Object.keys(output.contracts)[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  key = _step2.value;
                  _key$split = key.split(':'), _key$split2 = (0, _slicedToArray3.default)(_key$split, 2), fileName = _key$split2[1];
                  filePath = _path2.default.join(this.config.targetPath, fileName + '.json');
                  dirPath = _path2.default.dirname(filePath);

                  if (!_fs2.default.existsSync(dirPath)) {
                    _fs2.default.mkdirSync(dirPath);
                  }
                  content = JSON.stringify(output.contracts[key], null, 2);

                  try {
                    _fs2.default.writeFileSync(filePath, content);
                  } catch (err) {
                    this.console.error(err);
                  }
                }
                _context4.next = 11;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](3);
                _didIteratorError2 = true;
                _iteratorError2 = _context4.t0;

              case 11:
                _context4.prev = 11;
                _context4.prev = 12;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 14:
                _context4.prev = 14;

                if (!_didIteratorError2) {
                  _context4.next = 17;
                  break;
                }

                throw _iteratorError2;

              case 17:
                return _context4.finish(14);

              case 18:
                return _context4.finish(11);

              case 19:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 7, 11, 19], [12,, 14, 18]]);
      }));

      function saveOutput(_x2) {
        return _ref5.apply(this, arguments);
      }

      return saveOutput;
    }()
  }, {
    key: 'anyNonWarningErrors',
    value: function anyNonWarningErrors(errors) {
      if (!errors) {
        return false;
      }
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = errors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var error = _step3.value;

          if (!(0, _utils.isWarningMessage)(error)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return false;
    }
  }, {
    key: 'compile',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var output;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.doCompile();

              case 2:
                output = _context5.sent;

                if (output.errors) {
                  this.console.error(output.errors.join());
                }

                if (!this.anyNonWarningErrors(output.errors)) {
                  _context5.next = 8;
                  break;
                }

                this.process.exit(1);
                _context5.next = 10;
                break;

              case 8:
                _context5.next = 10;
                return this.saveOutput(output);

              case 10:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function compile() {
        return _ref6.apply(this, arguments);
      }

      return compile;
    }()
  }]);
  return Compiler;
}();

exports.default = Compiler;
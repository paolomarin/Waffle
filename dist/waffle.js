'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.solidity = exports.defaultAccounts = exports.contractWithWallet = exports.deployContract = exports.getWallets = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var getWallets = exports.getWallets = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(provider) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _defaultAccounts2.default.map(function (account) {
              return new _ethers.Wallet(account.secretKey, provider);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getWallets(_x2) {
    return _ref.apply(this, arguments);
  };
}();

var deployContract = exports.deployContract = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(wallet, contractJSON) {
    var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var overrideOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var abi, bytecode, factory, deployTransaction, tx, receipt;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            abi = contractJSON.interface;
            bytecode = '0x' + contractJSON.bytecode;
            factory = new _ethers.ContractFactory(abi, bytecode, wallet);
            deployTransaction = (0, _extends3.default)({}, _defaultDeployOptions2.default, overrideOptions, factory.getDeployTransaction.apply(factory, (0, _toConsumableArray3.default)(args)));
            _context2.next = 6;
            return wallet.sendTransaction(deployTransaction);

          case 6:
            tx = _context2.sent;
            _context2.next = 9;
            return wallet.provider.getTransactionReceipt(tx.hash);

          case 9:
            receipt = _context2.sent;
            return _context2.abrupt('return', new _ethers.Contract(receipt.contractAddress, abi, wallet));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function deployContract(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createMockProvider = createMockProvider;

var _ganacheCore = require('ganache-core');

var _ganacheCore2 = _interopRequireDefault(_ganacheCore);

var _ethers = require('ethers');

var _matchers = require('./matchers');

var _matchers2 = _interopRequireDefault(_matchers);

var _defaultAccounts = require('./config/defaultAccounts');

var _defaultAccounts2 = _interopRequireDefault(_defaultAccounts);

var _defaultDeployOptions = require('./config/defaultDeployOptions');

var _defaultDeployOptions2 = _interopRequireDefault(_defaultDeployOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultGanacheOptions = { accounts: _defaultAccounts2.default };

function createMockProvider() {
  var ganacheOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var options = (0, _extends3.default)({}, defaultGanacheOptions, { ganacheOptions: ganacheOptions });
  return new _ethers.providers.Web3Provider(_ganacheCore2.default.provider(options));
}

var contractWithWallet = exports.contractWithWallet = function contractWithWallet(contract, wallet) {
  return new _ethers.Contract(contract.address, contract.interface.abi, wallet);
};

exports.defaultAccounts = _defaultAccounts2.default;
var solidity = exports.solidity = _matchers2.default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async (host = "database") => {
  const defaultOptions = await (0, _typeorm.getConnectionOptions)();

  try {
    return (0, _typeorm.createConnection)(Object.assign(defaultOptions, {
      host,
      database: process.env.NODE_ENV === 'test' ? "investimentos_test" : defaultOptions.database
    }));
  } catch (error) {
    return (0, _typeorm.createConnection)(Object.assign(defaultOptions, {
      host,
      database: process.env.NODE_ENV === 'test' ? "investimentos_test" : defaultOptions.database
    }));
  }
};

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async (host = "ec2-44-198-236-169.compute-1.amazonaws.com") => {
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
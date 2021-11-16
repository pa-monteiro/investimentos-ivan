"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProductsController = void 0;

var _tsyringe = require("tsyringe");

var _CreateProductsUseCase = require("./CreateProductsUseCase");

class CreateProductsController {
  async handle(req, res) {
    const ctn = _tsyringe.container.resolve(_CreateProductsUseCase.CreateProductsUseCase);

    const response = await ctn.execute(req.body);
    return res.status(201).json(response);
  }

}

exports.CreateProductsController = CreateProductsController;
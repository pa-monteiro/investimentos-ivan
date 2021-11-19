"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListProductsController = void 0;

var _tsyringe = require("tsyringe");

var _ListProductsUseCase = require("./ListProductsUseCase");

class ListProductsController {
  async handle(req, res) {
    const useCase = _tsyringe.container.resolve(_ListProductsUseCase.ListProductsUseCase);

    const products = await useCase.execute();
    return res.status(200).json(products);
  }

}

exports.ListProductsController = ListProductsController;
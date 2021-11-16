"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveProductsController = void 0;

var _tsyringe = require("tsyringe");

var _RemoveProductsUseCase = require("./RemoveProductsUseCase");

class RemoveProductsController {
  async handle(req, res) {
    const ids = req.body;

    const ctn = _tsyringe.container.resolve(_RemoveProductsUseCase.RemoveProductsUseCase);

    await ctn.execute(ids);
    return res.status(204).send();
  }

}

exports.RemoveProductsController = RemoveProductsController;
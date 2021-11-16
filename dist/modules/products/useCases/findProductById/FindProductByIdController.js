"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindProductByIdController = void 0;

var _tsyringe = require("tsyringe");

var _FindProductByIdUseCase = require("./FindProductByIdUseCase");

class FindProductByIdController {
  async handle(request, response) {
    const {
      id
    } = request.params;

    const ctn = _tsyringe.container.resolve(_FindProductByIdUseCase.FindProductByIdUseCase);

    const res = await ctn.execute(id);
    return response.status(200).json(res);
  }

}

exports.FindProductByIdController = FindProductByIdController;
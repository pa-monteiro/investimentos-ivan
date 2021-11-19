"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDailyPostingController = void 0;

var _tsyringe = require("tsyringe");

var _CreateDailyPostingUseCase = require("./CreateDailyPostingUseCase");

class CreateDailyPostingController {
  async handle(req, res) {
    let data = req.body;
    data.user_id = req.user.id;

    const ctn = _tsyringe.container.resolve(_CreateDailyPostingUseCase.CreateDailyPostingUseCase);

    const response = await ctn.execute(data);
    return res.status(201).json(response);
  }

}

exports.CreateDailyPostingController = CreateDailyPostingController;
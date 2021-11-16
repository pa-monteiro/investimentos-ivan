"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

class UpdateUserAvatarController {
  async handle(req, res) {
    const {
      id
    } = req.user;
    const avatar_file = req.file.filename;

    const ctn = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUserCase);

    await ctn.execute({
      user_id: id,
      avatar_file
    });
    return res.status(204).send();
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;
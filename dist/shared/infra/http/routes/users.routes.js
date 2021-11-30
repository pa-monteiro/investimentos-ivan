"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _UpdateUserAvatarController = require("../../../../modules/account/useCases/updateUserAvatar/UpdateUserAvatarController");

var _CreateUserController = require("../../../../modules/account/useCases/createUsers/CreateUserController");

var _ListUsersController = require("../../../../modules/account/useCases/listUsers/ListUsersController");

var _RemoveUsersController = require("../../../../modules/account/useCases/removeUsers/RemoveUsersController");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _FindUserByIdController = require("../../../../modules/account/useCases/findUserById/FindUserByIdController");

var _UpdateUserController = require("../../../../modules/account/useCases/updateUser/UpdateUserController");

var _CreateBankAccountController = require("../../../../modules/account/useCases/createBankAccount/CreateBankAccountController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default.upload("./tmp/avatar"));
usersRoutes.post('/', new _CreateUserController.CreateUserController().handle);
usersRoutes.use(_ensureAuthenticated.ensureAuthenticated);
usersRoutes.patch('/avatar', uploadAvatar.single("avatar"), new _UpdateUserAvatarController.UpdateUserAvatarController().handle);
usersRoutes.use(_ensureAdmin.ensureAdmin);
usersRoutes.post('/bank-account', new _CreateBankAccountController.CreateBankAccountController().handle);
usersRoutes.get('/', new _ListUsersController.ListUsersController().handle);
usersRoutes.get('/:id', new _FindUserByIdController.FindUserByIdController().handle);
usersRoutes.put('/:id/update', new _UpdateUserController.UpdateUserController().handle);
usersRoutes.post('/remove', new _RemoveUsersController.RemoveUsersController().handle);
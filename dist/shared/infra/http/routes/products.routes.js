"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productsRouter = void 0;

var _CreateProductsController = require("@modules/products/useCases/createProducts/CreateProductsController");

var _FindProductByIdController = require("@modules/products/useCases/findProductById/FindProductByIdController");

var _GetProductsByUserController = require("@modules/products/useCases/getProductsByUser/GetProductsByUserController");

var _ListProductsController = require("@modules/products/useCases/listProducts/ListProductsController");

var _RemoveProductsController = require("@modules/products/useCases/removeProducts/RemoveProductsController");

var _UpdateProductsController = require("@modules/products/useCases/updateProducts/UpdateProductsController");

var _express = require("express");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsRouter = (0, _express.Router)();
exports.productsRouter = productsRouter;
productsRouter.use(_ensureAuthenticated.ensureAuthenticated);
productsRouter.get('/getProductsByUser', new _GetProductsByUserController.GetProductsByUserController().handle);
productsRouter.use(_ensureAdmin.ensureAdmin);
productsRouter.get('/', new _ListProductsController.ListProductsController().handle);
productsRouter.get('/:id', new _FindProductByIdController.FindProductByIdController().handle);
productsRouter.put('/:id', new _UpdateProductsController.UpdateProductsController().handle);
productsRouter.post('/', new _CreateProductsController.CreateProductsController().handle);
productsRouter.post('/remove', new _RemoveProductsController.RemoveProductsController().handle);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Payment = void 0;

var _User = require("@modules/account/infra/typeorm/entities/User");

var _Product = require("@modules/products/infra/typeorm/entities/Product");

var _typeorm = require("typeorm");

var _uuid = require("uuid");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Payment = (_dec = (0, _typeorm.Entity)("payments"), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec4 = (0, _typeorm.PrimaryColumn)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)(), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", Number), _dec10 = (0, _typeorm.ManyToOne)(() => _User.User), _dec11 = (0, _typeorm.JoinColumn)({
  name: "user_id"
}), _dec12 = Reflect.metadata("design:type", typeof _User.User === "undefined" ? Object : _User.User), _dec13 = (0, _typeorm.Column)(), _dec14 = Reflect.metadata("design:type", String), _dec15 = (0, _typeorm.ManyToOne)(() => _Product.Product), _dec16 = (0, _typeorm.JoinColumn)({
  name: "product_id"
}), _dec17 = Reflect.metadata("design:type", typeof _Product.Product === "undefined" ? Object : _Product.Product), _dec18 = (0, _typeorm.Column)(), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _typeorm.Column)(), _dec21 = Reflect.metadata("design:type", String), _dec22 = (0, _typeorm.CreateDateColumn)(), _dec23 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec24 = (0, _typeorm.UpdateDateColumn)(), _dec25 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class Payment {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "type", _descriptor2, this);

    _initializerDefineProperty(this, "value", _descriptor3, this);

    _initializerDefineProperty(this, "user", _descriptor4, this);

    _initializerDefineProperty(this, "user_id", _descriptor5, this);

    _initializerDefineProperty(this, "product", _descriptor6, this);

    _initializerDefineProperty(this, "product_id", _descriptor7, this);

    _initializerDefineProperty(this, "receipt_image", _descriptor8, this);

    _initializerDefineProperty(this, "created_at", _descriptor9, this);

    _initializerDefineProperty(this, "updated_at", _descriptor10, this);

    if (!this.id) {
      this.id = (0, _uuid.v4)();
    }
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec10, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "product", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "product_id", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "receipt_image", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);
exports.Payment = Payment;
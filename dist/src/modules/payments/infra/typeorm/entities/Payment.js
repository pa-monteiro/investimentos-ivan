"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
var User_1 = require("@modules/account/infra/typeorm/entities/User");
var Product_1 = require("@modules/products/infra/typeorm/entities/Product");
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var Payment = /** @class */ (function () {
    function Payment() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Payment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Payment.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Payment.prototype, "value", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }),
        (0, typeorm_1.JoinColumn)({
            name: "user_id"
        }),
        __metadata("design:type", User_1.User)
    ], Payment.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Payment.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Product_1.Product; }),
        (0, typeorm_1.JoinColumn)({
            name: "product_id"
        }),
        __metadata("design:type", Product_1.Product)
    ], Payment.prototype, "product", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Payment.prototype, "product_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Payment.prototype, "receipt_image", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Payment.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Payment.prototype, "updated_at", void 0);
    Payment = __decorate([
        (0, typeorm_1.Entity)("payments"),
        __metadata("design:paramtypes", [])
    ], Payment);
    return Payment;
}());
exports.Payment = Payment;

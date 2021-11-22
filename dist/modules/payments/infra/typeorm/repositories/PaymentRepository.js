"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentRepository = void 0;

var _typeorm = require("typeorm");

var _Payment = require("../entities/Payment");

class PaymentRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Payment.Payment);
  }

  async findByUser(id) {
    const allValues = await this.repository.createQueryBuilder("payments").select(['payments.id', 'payments.type', 'payments.value', 'product.id', 'product.name']).where({
      user_id: id
    }).leftJoin('payments.product', 'product').getMany();
    const products = []; // allValues.map(v => {            
    //     if(v.type === 'entries'){
    //         if(products.filter(p => p.product.id === v.product.id)){
    //             const product = products.filter(v => v.product.id)
    //             product.values += v.value;
    //             products.push(v);
    //         }else{
    //         products.push(v);
    //         }
    //     }else{
    //         products.push(v);
    //     }
    // })

    return allValues; // const entries = allValues.filter(e => e.type === 'entries');
    // const exits = allValues.filter(e => e.type === 'exits');
    // const sumEntries = entries.reduce((acc, e) => acc + parseFloat(e.value),0)
    // const sumExits = exits.reduce((acc, e) => acc + parseFloat(e.value),0)
    // const valueTotal = sumEntries - sumExits;
    // return allValues;
  }

  async create(data) {
    const payment = this.repository.create(data);
    return await this.repository.save(payment);
  }

}

exports.PaymentRepository = PaymentRepository;
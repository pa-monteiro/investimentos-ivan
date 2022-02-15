import { User } from "@modules/account/infra/typeorm/entities/User";
import { ICreateDailyPostingDTO } from "@modules/daily_posting/dtos/ICreateDailyPostingDTO";
import { IDailyPosting } from "@modules/daily_posting/repositories/IDailyPosting";
import { Payment } from "@modules/payments/infra/typeorm/entities/Payment";
import { PaymentUser } from "@modules/payments/infra/typeorm/entities/PaymentUser";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import dayjs from "dayjs";
import _ from "lodash";
import { Between, getRepository, Repository, MoreThan, Not } from "typeorm";

import { DailyPosting } from "../entities/DailyPosting";

class DailyPostingRepository implements IDailyPosting {
  private repository: Repository<DailyPosting>;
  private userRepository: Repository<User>;
  private paymentsRepository: Repository<Payment>;
  private paymentsUsersRepository: Repository<PaymentUser>;
  private productsRepository: Repository<Product>;

  constructor() {
    this.repository = getRepository(DailyPosting);
    this.userRepository = getRepository(User);
    this.paymentsRepository = getRepository(Payment);
    this.paymentsUsersRepository = getRepository(PaymentUser);
    this.productsRepository = getRepository(Product);
  }

  async getValuesToDashbtesteoard(user_id: string) {
    const startMonth = dayjs().startOf("month").toDate();
    const endMonth = dayjs().endOf("month").toDate();

    const totalLancamentoDiario = await this.repository
      .createQueryBuilder()
      .select("SUM(value) as TM")
      .where(
        "created_at >= :startMonth ::date AND created_at <= :endMonth ::date",
        {
          startMonth,
          endMonth,
        }
      )
      .getRawOne();

    const paymentsByMonth = await this.paymentsRepository
      .createQueryBuilder()
      .where(
        "accepted_at >= :startMonth ::date AND accepted_at <= :endMonth ::date",
        {
          startMonth,
          endMonth,
        }
      )
      .andWhere("type = :type", { type: "entries" })
      .andWhere("user_id = :user_id", { user_id })
      .getMany();

    const paymentUsersQuery = await this.paymentsUsersRepository.find({
      where: {
        user_id,
      },
    });

    const products = await this.productsRepository.find();

    const paymentUsers = this.mergeById(paymentUsersQuery, products);

    const valorTotalFundoPorProduto = _(paymentUsers)
      .groupBy("product_id")
      .map((objs, key) => ({
        product_id: key,
        product: _.find(objs, "product_id"),
        dtm: 0,
        pay: 0,
        rentabilidade: 0,
        lucro: 0,
        sum: 0,
        value: _.sumBy(objs, (item) => item.value),
      }))
      .value();

    const diaAtual = dayjs().get("date");

    valorTotalFundoPorProduto.map(async (v) => {
      v.dtm = v.product.percentage_by_product * totalLancamentoDiario.tm;

      v.pay =
        v.product.type === "fixed"
          ? v.value * (v.product.percentage / 100)
          : v.dtm - v.dtm * 0.35;
      v.rentabilidade = v.pay / this._numDias();

      let sum = 0;
      paymentsByMonth.map((pm) => {
        const diasContabilizados = diaAtual - dayjs(pm.accepted_at).get("date");
        if (pm.product_id === v.product_id) {
          const puq = paymentUsersQuery.find(
            (puq) =>
              puq.user_id === pm.user_id && puq.product_id === pm.product_id
          );
          console.log(
            "Fundo",
            v.product.name,
            "Porcentagem: ",
            puq.percentage_by_product,
            "Resultado: ",
            puq.percentage_by_product * diasContabilizados * v.rentabilidade
          );
          sum +=
            puq.percentage_by_product * diasContabilizados * v.rentabilidade;
        }
      });
      v.sum = v.product.type === "fixed" ? sum : sum + (v.pay - sum);
      v.lucro = v.product.type === "fixed" ? v.dtm - sum : v.dtm * 0.35;
    });

    return valorTotalFundoPorProduto;
  }

  async getValuesToDashboard(user_id: string) {
    const startMonth = dayjs().startOf("month").toDate();
    const endMonth = dayjs().endOf("month").toDate();

    const { tm: totalLancamentoDiario } = await this.repository
      .createQueryBuilder()
      .select("SUM(value) as TM")
      .where("date >= :startMonth ::date AND date <= :endMonth ::date", {
        startMonth,
        endMonth,
      })
      .getRawOne();

    const paymentsByMonth = await this.paymentsRepository
      .createQueryBuilder()
      .where("status IN (:...status)", { status: ["accepted", "released"] })
      .andWhere("type = :type", { type: "entries" })
      .getMany();

    const paymentUsersQuery = await this.paymentsUsersRepository.find();

    const products = await this.productsRepository.find();

    const paymentUsers = this.mergeById(paymentUsersQuery, products);
    const valorTotalFundoPorProduto = _(paymentUsers)
      .groupBy("product_id")
      .map((objs, key) => ({
        product_id: key,
        product: _.find(objs, "product_id"),
        proporcional: 0,
        dtm: 0,
        pagamentos: 0,
        rentabilidade: 0,
        lucro: 0,
        sum: 0,
        value: Number(_.sumBy(objs, (item) => Number(item.value))),
      }))
      .value();

    const valorTotalFundo = valorTotalFundoPorProduto.reduce(
      (acc, v) => acc + Number(v.value),
      0
    );

    valorTotalFundoPorProduto.map(async (v) => {
      v.proporcional = v.value / valorTotalFundo;
      v.dtm = v.proporcional * totalLancamentoDiario;
      v.pagamentos =
        v.product.type === "fixed"
          ? v.value * (v.product.percentage / 100)
          : v.dtm - v.dtm * 0.35;
      v.rentabilidade = v.pagamentos / this._numDias();

      let sum = 0;
      paymentsByMonth.map((pm) => {
        const diasContabilizados = dayjs().date();
        if (pm.product_id === v.product_id) {
          const puq = paymentUsersQuery.find(
            (puq) =>
              puq.user_id === pm.user_id && puq.product_id === pm.product_id
          );

          sum +=
            (puq.percentage_by_product / 100) *
            diasContabilizados *
            v.rentabilidade;
        }
      });

      v.sum = v.product.type === "fixed" ? sum : sum + (v.pagamentos - sum);
      v.lucro = v.product.type === "fixed" ? v.dtm - sum : v.dtm * 0.35;
    });
    const arrayteste = [];
    const paymentsDoFulano = await this.paymentsUsersRepository.find({
      where: {
        user_id,
      },
    });

    valorTotalFundoPorProduto.map((vtfp) => {
      const ppp = paymentsDoFulano.find(
        (pdf) => pdf.product_id === vtfp.product_id
      );
      if (ppp.product_id === vtfp.product_id) {
        const proporcional = ppp.value / vtfp.value;
        arrayteste.push({
          valorTotal: Number(ppp.value),
          product_id: ppp.product_id,
          product_name: ppp.product.name,
          proporcional,
          lucro: proporcional * dayjs().date() * vtfp.rentabilidade,
        });
      }
    });
    return arrayteste;
  }

  async getValuesToIndicatorsReport() {
    const months = [
      undefined,
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const array = [];
    // const totalUsers = _.groupBy(users, function(item) {
    //     return String(item.created_at).slice(3,7);
    // });
    for (let i = dayjs().month(); i > -1; i--) {
      const startMonth = dayjs().startOf("month").month(i).toDate();
      const endMonth = dayjs().endOf("month").month(i).toDate();
      const totalLancamentoDiario = await this.repository
        .createQueryBuilder()
        .select("SUM(value) as TM")
        .where(
          "created_at >= :startMonth ::date AND created_at <= :endMonth ::date",
          {
            startMonth,
            endMonth,
          }
        )
        .getRawOne();

      const paymentsByMonth = await this.paymentsRepository
        .createQueryBuilder()
        .where(
          "accepted_at >= :startMonth ::date AND accepted_at <= :endMonth ::date",
          {
            startMonth,
            endMonth,
          }
        )
        .andWhere("type = :type", { type: "entries" })
        .getMany();

      const paymentUsersQuery = await this.paymentsUsersRepository.find();

      const products = await this.productsRepository.find();

      const paymentUsers = this.mergeById(paymentUsersQuery, products);

      const valorTotalFundoPorProduto = _(paymentUsers)
        .groupBy("product_id")
        .map((objs, key) => ({
          product_id: key,
          product: _.find(objs, "product_id"),
          proporcional: 0,
          dtm: 0,
          pay: 0,
          rentabilidade: 0,
          lucro: 0,
          lancamentoDiario: Number(totalLancamentoDiario.tm),
          sum: 0,
          month: months[i + 1],
          value: _.sumBy(objs, (item) => item.value),
        }))
        .value();

      const valorTotalFundo = valorTotalFundoPorProduto.reduce(
        (acc, v) => acc + Number(v.value),
        0
      );
      const diasDoMes = endMonth.getDate() + 1;
      valorTotalFundoPorProduto.map(async (v) => {
        v.proporcional = v.value / valorTotalFundo;
        v.dtm = v.proporcional * totalLancamentoDiario.tm;
        v.pay =
          v.product.type === "fixed"
            ? v.value * (v.product.percentage / 100)
            : v.dtm - v.dtm * 0.35;
        v.rentabilidade = v.pay / endMonth.getDate();

        let sum = 0;
        paymentsByMonth.map((pm) => {
          const diasContabilizados =
            diasDoMes - dayjs(pm.accepted_at).get("date");
          if (pm.product_id === v.product_id) {
            const puq = paymentUsersQuery.find(
              (puq) =>
                puq.user_id === pm.user_id && puq.product_id === pm.product_id
            );
            sum +=
              puq.percentage_by_product * diasContabilizados * v.rentabilidade;
          }
        });
        v.sum = v.product.type === "fixed" ? sum : sum + (v.pay - sum);
        v.lucro = v.product.type === "fixed" ? v.dtm - sum : v.dtm * 0.35;
      });

      array.push(valorTotalFundoPorProduto);
    }

    return array;
  }

  async getDailyPostingsByMonth() {
    const startMonth = dayjs().startOf("month").toDate();
    const endMonth = dayjs().endOf("month").toDate();

    return await this.repository.find({
      where: {
        date: Between(startMonth, endMonth),
      },
      order: {
        date: "DESC",
      },
    });
  }

  async getValuesToDashboardAdmin() {
    const startMonth = dayjs().startOf("month").toDate();
    const endMonth = dayjs().endOf("month").toDate();

    const { tm: totalLancamentoDiario } = await this.repository
      .createQueryBuilder()
      .select("SUM(value) as TM")
      .where("date >= :startMonth ::date AND date <= :endMonth ::date", {
        startMonth,
        endMonth,
      })
      .getRawOne();

    const paymentsByMonth = await this.paymentsRepository
      .createQueryBuilder()
      .where("status IN (:...status)", { status: ["accepted", "released"] })
      .andWhere("type = :type", { type: "entries" })
      .getMany();

    const paymentUsersQuery = await this.paymentsUsersRepository.find();

    const products = await this.productsRepository.find();

    const paymentUsers = this.mergeById(paymentUsersQuery, products);
    const valorTotalFundoPorProduto = _(paymentUsers)
      .groupBy("product_id")
      .map((objs, key) => ({
        product_id: key,
        product: _.find(objs, "product_id"),
        proporcional: 0,
        dtm: 0,
        pagamentos: 0,
        rentabilidade: 0,
        lucro: 0,
        sum: 0,
        value: Number(_.sumBy(objs, (item) => Number(item.value))),
      }))
      .value();

    const valorTotalFundo = valorTotalFundoPorProduto.reduce(
      (acc, v) => acc + Number(v.value),
      0
    );

    valorTotalFundoPorProduto.map(async (v) => {
      v.proporcional = v.value / valorTotalFundo;
      v.dtm = v.proporcional * totalLancamentoDiario;
      v.pagamentos =
        v.product.type === "fixed"
          ? v.value * (v.product.percentage / 100)
          : v.dtm - v.dtm * 0.35;
      v.rentabilidade = v.pagamentos / this._numDias();

      let sum = 0;
      paymentsByMonth.map((pm) => {
        const diasContabilizados = dayjs().date();
        console.log("dias contabilizados", diasContabilizados);
        if (pm.product_id === v.product_id) {
          const puq = paymentUsersQuery.find(
            (puq) =>
              puq.user_id === pm.user_id && puq.product_id === pm.product_id
          );
          console.log(
            "Produto:",
            puq.product_id,
            "Porcentagem:",
            puq.percentage_by_product,
            diasContabilizados,
            v.rentabilidade
          );
          sum +=
            (puq.percentage_by_product / 100) *
            diasContabilizados *
            v.rentabilidade;
        }
      });

      v.sum = v.product.type === "fixed" ? sum : sum + (v.pagamentos - sum);
      v.lucro = v.product.type === "fixed" ? v.dtm - sum : v.dtm * 0.35;
    });
    return valorTotalFundoPorProduto;
  }

  async getValuesToIndicatorsReportO() {
    const months = [
      undefined,
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const array = [];
    // const totalUsers = _.groupBy(users, function(item) {
    //     return String(item.created_at).slice(3,7);
    // });
    for (let i = dayjs().month(); i > -1; i--) {
      const startMonth = dayjs().startOf("month").month(i).toDate();
      const endMonth = dayjs().endOf("month").month(i).toDate();
      const users = await this.userRepository.count({
        where: {
          created_at: Between(startMonth, endMonth),
        },
      });

      const { result } = await this.repository
        .createQueryBuilder("daily_postings")
        .where("date BETWEEN :prev AND :next", {
          prev: startMonth,
          next: endMonth,
        })
        .select("SUM(value) as result")
        .getRawOne();

      const commission = (parseFloat(result) * 30) / 100;

      const { entries } = await this.paymentsRepository
        .createQueryBuilder("payments")
        .where("type = :type", { type: "entries" })
        .andWhere("created_at BETWEEN :prev AND :next", {
          prev: startMonth,
          next: endMonth,
        })
        .select("SUM(value) as entries")
        .getRawOne();

      const { exits } = await this.paymentsRepository
        .createQueryBuilder("payments")
        .where("payments.type = :type", { type: "exits" })
        .andWhere("created_at BETWEEN :prev AND :next", {
          prev: startMonth,
          next: endMonth,
        })
        .select("SUM(value) as exits")
        .getRawOne();

      array.push({
        month: months[i + 1],
        resultTotal: parseFloat(result),
        entries: parseFloat(entries),
        exits: parseFloat(exits),
        commission,
        newUsers: users,
      });
    }

    return array;
  }

  async create(data: ICreateDailyPostingDTO): Promise<DailyPosting> {
    const daily = this.repository.create(data);

    return await this.repository.save(daily);
  }

  async update(data: ICreateDailyPostingDTO): Promise<DailyPosting> {
    const daily = this.repository.findOne(data.id);

    return await this.repository.save({ daily, ...data });
  }

  private mergeById = (a1, a2) =>
    a1.map((itm) => ({
      ...a2.find((item) => item.id === itm.product_id && item),
      ...itm,
    }));

  private _numDias() {
    const objData = new Date();
    const numAno = objData.getFullYear();
    const numMes = objData.getMonth() + 1;
    const numDias = new Date(numAno, numMes, 0).getDate();

    return numDias;
  }
}

export { DailyPostingRepository };

import { uuid } from "uuidv4";
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .reduce((total, transaction) =>
        transaction.type === "income" ?
          total + transaction.value :
          total,
        0);

    const outcome = this.transactions
      .reduce((total, transaction) =>
        transaction.type === "outcome" ?
          total + transaction.value :
          total,
        0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: Omit<Transaction, "id">): Transaction {
    const transaction = {
      id: uuid(),
      title,
      value,
      type
    };
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, "id">): Transaction {
    if (type === "outcome" && this.transactionsRepository.getBalance().total < value)
      throw Error("Insufficient funds for this transaction.");

    return this.transactionsRepository.create({
      title,
      value,
      type
    });
  }
}

export default CreateTransactionService;

import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionDto } from './dtos/CreateTrasactionDto';
import { AccountDocument, Accounts } from 'src/database/models/Accounts.model';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
  TransactionType,
} from 'src/database/models/Transactions.model';

export class TransactionService {
  constructor(
    @InjectModel(Accounts.name)
    private readonly accountModel: Model<AccountDocument>,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}
  async createTransaction(data: CreateTransactionDto) {
    const { email, type, amount } = data;

    const account = await this.accountModel.findOne({ email });

    const transaction = await this.transactionModel.create({
      userId: account.id,
      type,
      amount,
    });

    if (type === TransactionType.DEPOSIT) {
      const balance = account.balance + amount;
      await this.accountModel.updateOne({ email }, { balance });
    } else {
      const balance = account.balance - amount;
      await this.accountModel.updateOne({ email }, { balance });
    }

    return transaction;
  }

  async getTransactions(data: Accounts) {
    return await this.transactionModel.find({ userId: data._id });
  }
}

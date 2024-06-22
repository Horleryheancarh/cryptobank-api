import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModel, Accounts } from 'src/database/models/Accounts.model';
import {
  Transaction,
  TransactionModel,
} from 'src/database/models/Transactions.model';
import { TransactionService } from './transactions.service';
import { TransactionController } from './transactions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Accounts.name,
        schema: AccountModel,
      },
      {
        name: Transaction.name,
        schema: TransactionModel,
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}

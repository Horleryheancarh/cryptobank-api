import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dtos/CreateTrasactionDto';
import { AuthUser } from 'src/decorators/auth';
import { Accounts } from 'src/database/models/Accounts.model';
import { TransactionService } from './transactions.service';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('add')
  async createTransaction(@Body() createTransaction: CreateTransactionDto) {
    return await this.transactionService.createTransaction(createTransaction);
  }

  @Get()
  async getTransactions(@AuthUser() user: Accounts) {
    return await this.transactionService.getTransactions(user);
  }
}

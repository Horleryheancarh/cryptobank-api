import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNumber } from 'class-validator';
import { TransactionType } from 'src/database/models/Transactions.model';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Transaction type',
  })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    description: 'Amount',
  })
  @IsNumber()
  amount: number;
}

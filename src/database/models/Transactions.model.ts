import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Accounts } from './Accounts.model';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

@Schema({
  timestamps: true,
})
export class Transaction {
  _id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accounts',
  })
  userId: Accounts;

  @Prop({ required: true })
  type: TransactionType;

  @Prop({ required: true })
  amount: number;
}

export type TransactionDocument = Transaction & Document;

export const TransactionModel = SchemaFactory.createForClass(Transaction);

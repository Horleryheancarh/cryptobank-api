import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Wallet {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    default: 0,
  })
  balance: number;
}

export type WalletDocument = Wallet & Document;

export const WalletModel = SchemaFactory.createForClass(Wallet);

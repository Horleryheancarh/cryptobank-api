import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from 'src/database/models/Wallets.model';
import { CreateWalletDto } from './dtos/createWallet.dto';
import { CreditWalletDto } from './dtos/creditWallet.dto';
import { TransferAmountDto } from './dtos/transferAmount.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
  ) {}

  async createWallet(createWalletDto: CreateWalletDto): Promise<Wallet> {
    return await this.walletModel.create(createWalletDto);
  }

  async creditWallet(creditWalletDto: CreditWalletDto) {
    const { email, amount } = creditWalletDto;

    const wallet = await this.walletModel.findOne({ email });

    if (!wallet) throw new NotFoundException('Wallet Not Found');

    await wallet.updateOne({
      balance: wallet.balance + amount,
    });

    return wallet;
  }

  async inHouseTransfer(transferAmountDto: TransferAmountDto) {
    const { source, destination, amount } = transferAmountDto;
    const sourceAccount = await this.walletModel.findOne({
      email: source,
    });

    if (!sourceAccount) throw new NotFoundException('Source Wallet Not Found');

    if (sourceAccount.balance < amount)
      throw new NotFoundException('Insufficient Funds');

    const destinationAccount = await this.walletModel.findOne({
      email: destination,
    });

    if (!destinationAccount)
      throw new NotFoundException('Destination Wallet Not Found');

    await sourceAccount.updateOne({ balance: sourceAccount.balance - amount });
    await destinationAccount.updateOne({
      balance: destinationAccount.balance + amount,
    });

    return 'Transfer made';
  }

  async fetchWalletBalance(email: string) {
    const wallet = await this.walletModel.findOne({ email });

    if (!wallet) throw new NotFoundException('Wallet Not Found');

    return wallet.balance;
  }
}

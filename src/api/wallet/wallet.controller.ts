import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { APIResponse } from 'src/types/APIResponse';
import { Wallet } from 'src/database/models/Wallets.model';
import { CreateWalletDto } from './dtos/createWallet.dto';
import { CreditWalletDto } from './dtos/creditWallet.dto';
import { EmailDto } from './dtos/email.dto';
import { TransferAmountDto } from './dtos/transferAmount.dto';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiOperation({
    summary: 'Create Wallet',
  })
  @Post('wallet')
  async createWallet(
    @Body() data: CreateWalletDto,
  ): Promise<APIResponse<Wallet>> {
    const wallet = await this.walletService.createWallet(data);

    return new APIResponse<Wallet>(wallet);
  }

  @ApiOperation({
    summary: 'Credit Wallet',
  })
  @Post('wallet/credit')
  async creditWallet(
    @Body() data: CreditWalletDto,
  ): Promise<APIResponse<Wallet>> {
    const wallet = await this.walletService.creditWallet(data);

    return new APIResponse<Wallet>(wallet);
  }

  @ApiOperation({
    summary: 'Transfer Between Wallets',
  })
  @Post('wallet/transfer')
  async inHouseTransfer(
    @Body() data: TransferAmountDto,
  ): Promise<APIResponse<string>> {
    const wallet = await this.walletService.inHouseTransfer(data);

    return new APIResponse<string>(wallet);
  }

  @ApiOperation({
    summary: 'Get Wallet Balance',
  })
  @Get('wallet/balance/:email')
  async getWalletBalance(@Param('email') data: EmailDto) {
    const balance = await this.walletService.fetchWalletBalance(data.email);

    return new APIResponse<number>(balance);
  }
}

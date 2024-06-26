import { Module } from '@nestjs/common';
import { WalletModule } from './api/wallet/wallet.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './api/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './api/auth/jwt.auth.guard';

@Module({
  imports: [DatabaseModule, AuthModule, WalletModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

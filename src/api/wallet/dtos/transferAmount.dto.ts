import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';

export class TransferAmountDto {
  @ApiProperty()
  @IsEmail()
  source: string;

  @ApiProperty()
  @IsEmail()
  destination: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}

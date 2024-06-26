import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accounts, AccountDocument } from 'src/database/models/Accounts.model';
import { RegisterDto } from './dtos/RegisterDto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dtos/LoginDto';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Accounts.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(registerDto: RegisterDto): Promise<Accounts> {
    const { username, email, password, confirmPassword } = registerDto;

    if (await this.accountModel.findOne({ $or: [{ email }, { username }] })) {
      throw new BadRequestException('Email or username already in use');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Password and confirm password must match');
    }

    const hash = await bcrypt.hash(password, 10);
    const account = await this.accountModel.create({
      ...registerDto,
      password: hash,
    });

    return {
      _id: account._id,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      username: account.username,
    } as Accounts;
  }

  async login(loginDto: LoginDto): Promise<Accounts> {
    const { email, password } = loginDto;
    const account = await this.accountModel.findOne({ email });

    if (!account) throw new UnauthorizedException('Email does not exist');
    if (!bcrypt.compareSync(password, account.password)) {
      throw new UnauthorizedException('Incorrect password');
    }

    return {
      _id: account._id,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      username: account.username,
    } as Accounts;
  }

  async signAccount(account: Accounts): Promise<string> {
    return this.jwtService.signAsync(
      {
        email: account.email,
        username: account.username,
        id: account._id,
      },
      {
        algorithm: 'HS256',
        secret: JWT_SECRET,
      },
    );
  }
}

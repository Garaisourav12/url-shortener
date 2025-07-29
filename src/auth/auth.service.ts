import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { RegisterDtoTs } from './dto/register.dto.ts';
import { LoginDtoTs } from './dto/login.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDtoTs) {
    const { email, password, username } = dto;

    const existing = await this.userModel.findOne({ email });
    if (existing) throw new UnauthorizedException('User already exists');

    const hash = await bcrypt.hash(password, 10);
    const createdUser = await this.userModel.create({
      email,
      username,
      password: hash,
    });

    return createdUser;
  }

  async login(dto: LoginDtoTs) {
    const { email, password } = dto;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }
}

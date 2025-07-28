import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDtoTs {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDtoTs {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Valid email address for registration',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Password with at least 6 characters',
  })
  @MinLength(6)
  password: string;
}

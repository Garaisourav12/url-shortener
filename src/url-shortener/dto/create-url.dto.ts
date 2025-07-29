import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Min,
} from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
  @ApiProperty({
    example: 'https://www.example.com/very-long-url',
  })
  @IsUrl()
  url: string;

  @ApiPropertyOptional({
    example: 'custom-alias',
    description: 'Optional custom shortcode',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]{4,20}$/, {
    message: 'customCode must be 4-20 characters (letters, digits, - or _)',
  })
  customCode?: string;

  @ApiPropertyOptional({
    example: 10,
    description: 'Maximum number of clicks (optional)',
  })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'maxClicks must be positive' })
  maxClicks?: number;

  @ApiPropertyOptional({
    example: '7 days',
    description:
      'Validity duration, like "7 days", "10 hours", "2 weeks" (optional)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+\s*(seconds?|minutes?|hours?|days?|weeks?|months?)$/i, {
    message:
      'validityDuration must be like "7 days", "10 hours", "2 weeks", etc.',
  })
  validityDuration?: string;
}

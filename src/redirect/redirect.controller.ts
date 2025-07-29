import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('r')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':shortCode')
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  @ApiOperation({
    summary: 'Redirect to the original URL using the short code',
  })
  @ApiParam({
    name: 'shortCode',
    description: 'Unique short code generated for the original URL',
    example: 'custom-alias',
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Redirects to the original long URL',
    headers: {
      Location: {
        description: 'Target URL to which the client will be redirected',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Short URL not found or inactive',
    schema: {
      example: {
        statusCode: 404,
        message: 'Short URL not found or inactive',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.GONE,
    description: 'URL has expired or click limit reached',
    schema: {
      example: {
        statusCode: 410,
        message: 'URL has expired',
        error: 'Gone',
      },
    },
  })
  async handleRedirect(
    @Param('shortCode') shortCode: string,
    @Res() res: Response & any,
  ) {
    const originalUrl = await this.redirectService.resolveShortCode(shortCode);
    return res.redirect(originalUrl);
  }
}

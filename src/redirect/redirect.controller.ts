import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { RedirectService } from './redirect.service';

@Controller('r')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':shortCode')
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  async handleRedirect(
    @Param('shortCode') shortCode: string,
    @Res() res: Response & any,
  ) {
    const originalUrl = await this.redirectService.resolveShortCode(shortCode);
    return res.redirect(originalUrl);
  }
}

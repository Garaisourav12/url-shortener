import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from 'src/url-shortener/schemas/url.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Url.name, schema: UrlSchema }, // ✅ Register the Url model
    ]),
  ],
  controllers: [RedirectController],
  providers: [RedirectService],
})
export class RedirectModule {}

import { Module } from '@nestjs/common';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './schemas/url.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Url.name, schema: UrlSchema }, // ✅ REGISTER MODEL HERE
    ]),
  ],
  controllers: [UrlShortenerController],
  providers: [UrlShortenerService],
})
export class UrlShortenerModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const baseUrl = configService.get<string>(
    'BASE_URL',
    'http://localhost:3000',
  );
  const port = configService.get<number>('PORT') ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('API for shortening URLs')
    .setVersion('1.0')
    .addServer(baseUrl)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());

  console.log(`Server running on ${baseUrl}`);
  await app.listen(port || 3000);
}
bootstrap();

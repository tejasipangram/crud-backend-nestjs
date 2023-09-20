import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log(path.join(__dirname, '../uploads'));
  app.useStaticAssets(path.join(__dirname, '../uploads'));
  app.enableCors({ origin: 'http://localhost:3001', credentials: true });

  await app.listen(3000);
}
bootstrap();

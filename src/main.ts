import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })) // Enable global validation pipe
  app.useGlobalInterceptors(new TransformInterceptor()) // Enable global response interceptor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

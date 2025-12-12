import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Backend API document')
    .setVersion('1.0')
    .build();

  // Swagger 문서 생성 방식을 factory 함수로 제공
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // 'api-docs' 경로에 Swagger UI 설정
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(3000);
}

bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('API Competition')
    .setDescription('Documentation de l’API pour le projet Competition')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api/docs', app, document);
    console.log('📘 Swagger disponible sur: http://localhost:3000/api/docs');
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

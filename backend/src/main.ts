import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { AuthGuard } from './core/auth/auth.guard';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.enableCors();

  await app.listen(port, () => {
    console.log(`Backend now Running on Port: ${port}`)
  });
  
}
bootstrap();

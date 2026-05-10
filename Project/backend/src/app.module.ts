import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'mysql',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root@123',
      database: process.env.DB_DATABASE || 'docker_learn',
      entities: [Product],
      synchronize: true,
      logging: false,
      retryDelay: 3000,
      retryAttempts: 5,
    }),
    ProductsModule,
  ],
})
export class AppModule {}

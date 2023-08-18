import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployersModule } from './employers/employers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './employers/entities/employer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'ninja_api',
      entities: [Employer],
      synchronize: true,
    }),
    NinjasModule, AuthModule, UsersModule, EmployersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

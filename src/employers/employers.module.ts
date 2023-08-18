import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { EmployersRepo } from './employers.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Employer])],
  controllers: [EmployersController],
  providers: [EmployersService, EmployersRepo],
})
export class EmployersModule {}

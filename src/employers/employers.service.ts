import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { EmployersRepo } from './employers.repo';

@Injectable()
export class EmployersService {

  constructor(private readonly employersRepo: EmployersRepo) {}

  async create(createEmployerDto: CreateEmployerDto) {
    const { confirmPassword, ...employerDetail } = createEmployerDto;
    return await this.employersRepo.createEmployer(employerDetail);
  }

  async findAll() {
    return await this.employersRepo.findAllEmployers();
  }

  async findOne(id: number) {
    const employer = await this.employersRepo.findOneEmployer(id);
    if(employer === null) {
      throw new NotFoundException(`Employer with ID ${id} not found`);
    } else {
      return employer;
    }
  }

  async update(id: number, updateEmployerDto: UpdateEmployerDto) {
    const employer = await this.employersRepo.findOneEmployer(id);
    if (employer === null) {
      throw new NotFoundException(`Employer with ID ${id} not found, Update Unsuccessful`);
    } else {
      return await this.employersRepo.updateEmployer(updateEmployerDto);
    }
  }

  async remove(id: number) {
    const employer = await this.employersRepo.findOneEmployer(id);
    if (employer === null) {
      throw new NotFoundException(`Employer with ID ${id} not found, Delete Unsuccessful`);
    } else {
      return await this.employersRepo.deleteEmployer(id);
    }
  }
}

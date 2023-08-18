import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, HttpException, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Post()
  createEmployer(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employersService.create(createEmployerDto);
  }

  @Get()
  findAllEmployers() {
    return this.employersService.findAll();
  }

  @Get(':id')
  findOneEmployer(@Param('id') id: string) {
    try {
      return this.employersService.findOne(+id);
    } catch(error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(`Employer with ID ${id} not found`, HttpStatus.NOT_FOUND);
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmployerDto: UpdateEmployerDto) {
    try {
      return this.employersService.update(+id, updateEmployerDto);
    } catch(error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(`Employer with ID ${id} not found`, HttpStatus.NOT_FOUND);
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.employersService.remove(+id);
    } catch(error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(`Employer with ID ${id} not found`, HttpStatus.NOT_FOUND);
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }
}

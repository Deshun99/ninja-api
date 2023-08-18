import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employer } from "./entities/employer.entity";
import { EntityRepository, Repository } from "typeorm";
import { EmployerDetailDto } from "./dto/employer-detail.dto";
import { UpdateEmployerDto } from "./dto/update-employer.dto";

@Injectable()
export class EmployersRepo {

    constructor(
        @InjectRepository(Employer) private employerRepository: Repository<Employer>,
    ) {
    }

    async findAllEmployers(): Promise<Employer[]> {
        return this.employerRepository.find();
    }

    async findOneEmployer(employerId: number): Promise<Employer> {
        return await this.employerRepository.findOneBy( { id: employerId });
    }

    async createEmployer(employerDetails: EmployerDetailDto): Promise<Employer> {
        const newEmployer = this.employerRepository.create({
            ...employerDetails,
            createdAt: new Date(),
        });
        return this.employerRepository.save(newEmployer);
    }

    async deleteEmployer(employerId: number): Promise<void> {
        const employer = await this.employerRepository.findOneBy( { id: employerId } );
        await this.employerRepository.remove(employer);
    }

    async updateEmployer(employerDetails: UpdateEmployerDto): Promise<Employer> {
        const employer = await this.employerRepository.findOne( { where: { username: employerDetails.username }}, );
        employer.password = employerDetails.password;
        employer.authStrategy = employerDetails.authStrategy;
        return this.employerRepository.save(employer);
    }
}
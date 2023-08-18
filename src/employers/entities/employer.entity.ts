import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'employers'})
export class Employer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    createdAt: Date;

    @Column({ nullable: true })
    authStrategy: string;
}

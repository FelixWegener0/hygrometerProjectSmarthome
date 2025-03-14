import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Temperature {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    room: string;

    @Column({ nullable: false })
    humidity: number;

    @Column({ nullable: false })
    temperature: number;

    @Column({ nullable: false })
    createdAt: Date;
}

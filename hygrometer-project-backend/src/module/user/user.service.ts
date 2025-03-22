import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserCreateDto } from "./dto/user-create.dto";
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createDto: UserCreateDto): Promise<void> {
        this.userRepository.create(createDto);
    }

    async getToken(name: string, password: string): Promise<string | undefined> {
        const user = await this.userRepository.findOne({
            where: { name: name }
        });

        if (user?.password === password) {
            return process.env.BACKEND_TOKEN;
        } else {
            return undefined;
        }
    }

}

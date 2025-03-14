import { Injectable } from "@nestjs/common";
import { Temperature } from "./entities/temperature.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TemperatureResponseDto } from "./dto/temperature-response.dto";
import { TemperatureCreateDto } from "./dto/temperature-create.dto";

@Injectable()
export class TemperatureService {
    
    constructor(
        @InjectRepository(Temperature)
        private temperatureRepository: Repository<Temperature>,
    ) {}

    async findAll(): Promise<TemperatureResponseDto[]> {
        return await this.temperatureRepository.find();
    }

    async create(createDto: TemperatureCreateDto): Promise<TemperatureResponseDto> {
        const newTemperatureData = this.temperatureRepository.create({...createDto, createdAt: new Date()});
        return await this.temperatureRepository.save(newTemperatureData);
    }

    async findLatest(): Promise<TemperatureResponseDto | null> {
        return await this.temperatureRepository.findOne({
            where: {},
            order: { createdAt: 'DESC' }
        });
    }

    async removeOne(id: string): Promise<void> {
        await this.temperatureRepository.delete(id);
    }
    
    async removeAll(): Promise<void> {
        const result = await this.temperatureRepository.find();

        result.forEach((entry) => {
            this.temperatureRepository.delete(entry.id);
        });
    }

}

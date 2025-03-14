import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { TemperatureService } from "./temperature.service";
import { TemperatureCreateDto } from "./dto/temperature-create.dto";

@Controller('temp')
export class TemperatureController {

    constructor(private temperatureService: TemperatureService) {}

    @Get()
    async findAll() {
        return await this.temperatureService.findAll();
    }

    @Post()
    async create(@Request() req, @Body() createNew: TemperatureCreateDto) {
        return await this.temperatureService.create(createNew);
    }

    @Get('/latest')
    async findLatest() {
        return await this.temperatureService.findLatest();
    }

    @Post('/removeOne')
    async removeOne(@Body() id: string) {
        await this.temperatureService.removeOne(id);
        return null;
    }

    @Get('/removeAll')
    async removeAll() {
        this.temperatureService.removeAll();
        return null;
    }
}

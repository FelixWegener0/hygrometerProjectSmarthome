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

    @Post('/findByRoomAll')
    async findByRoomAll(@Body() body) {
        return await this.temperatureService.findAllbyRoom(body.room);
    }

    @Get('/latest')
    async findLatest() {
        return await this.temperatureService.findLatest();
    }

    @Post('/findByRoomLatest')
    async findLatestByRoom(@Body() body) {
        return await this.temperatureService.findLatestByRoom(body.room);
    }

    @Post('/removeOne')
    async removeOne(@Body() body) {
        await this.temperatureService.removeOne(body.id);
        return null;
    }

    @Get('/removeAll')
    async removeAll() {
        this.temperatureService.removeAll();
        return null;
    }
}

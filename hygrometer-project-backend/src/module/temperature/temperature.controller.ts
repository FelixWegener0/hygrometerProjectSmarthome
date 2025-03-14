import { Controller, Get } from "@nestjs/common";
import { TemperatureService } from "./temperature.service";

@Controller('temp')
export class TemperatureController {

    constructor(private temperatureService: TemperatureService) {}

    @Get()
    findAll() {
        this.temperatureService.findAll();
    }
}
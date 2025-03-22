import { Body, Controller, Post, UseGuards, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/core/auth/auth.guard";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createUser(@Body() body): Promise<void> {
        const { name, password, permissionLevel } = body;
        await this.userService.create({name, password, permissionLevel})
    }

    @Get('/getToken')
    async getTokenForUser(@Body() body): Promise<string | undefined> {
        return await this.userService.getToken(body.name, body.password);
    }

}

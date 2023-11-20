import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import mongoose from "mongoose";
import { JwtAuthGuard } from "src/auth/guards/jwt/jwt.guard";
import { ROLE } from "src/auth/guards/roles/role.enum";
import { Roles } from "src/auth/guards/roles/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { User } from "src/users/schema/user.schema";
import { SignUpDto } from "../auth/dto/signUpDto.dto";
import { UserService } from "./users.service";
import { UserInfoDto } from "./dto/UserInfoDto.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {} //dichiara ed inizializza

    @Post('create')
    async create(@Body() body: SignUpDto) {
        return await this.userService.create(body);
    }

    @Get('list')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLE.Admin)
    async findAll(@Req() req: any) {
        console.log({red: req.user})
        return await this.userService.findAll();
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async findUserProfile(@Req() req: any) {
        const {userId} = req.user
        return await this.userService.findOneById(userId)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLE.Admin)
    async findOne(@Param('id') id: string) {
        return await this.userService.findOneById(id);
    }

    @Put('me')
    @UseGuards(JwtAuthGuard)
    async updateProfile(@Req() req: any, @Body() body: UserInfoDto) {
        const {userId} = req.user
        return await this.userService.updateOne(userId, userId, body);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLE.Admin)
    async updateOne(@Req() req: any, @Param('id') id: string, @Body() body: UserInfoDto) {
        const {userId, isAdmin} = req.user
        return await this.userService.updateOne(id, userId, body);
    }



    @Put('activateMe/')
    @UseGuards(JwtAuthGuard)
    async activeMe(@Req() req: any) {
        const {userId, isAdmin} = req.user
        return await this.userService.activateOne(userId, userId, isAdmin);
    }

    @Put('deactivateMe/')
    @UseGuards(JwtAuthGuard)
    async disactiveMe(@Req() req: any) {
        const {userId, isAdmin} = req.user
        return await this.userService.activateOne(userId, userId, isAdmin);
    }

    @Put('activate/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(ROLE.Admin)
    async activeOne(@Req() req: any, @Param('id') id: string) {
        const {userId, isAdmin} = req.user
        return await this.userService.activateOne(id, userId, isAdmin);
    }

    @Put('deactivate/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(ROLE.Admin)
    async deactivateOne(@Req() req: any, @Param('id') id: string) {
        const {userId, isAdmin} = req.user
        return await this.userService.deactivateOne(id, userId, isAdmin);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLE.Admin)
    async deleteOne(@Param('id') id: string) {
        return await this.userService.deleteOne(id);
    }

}

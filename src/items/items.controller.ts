import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt/jwt.guard";
import { ROLE } from "src/auth/guards/roles/role.enum";
import { Roles } from "src/auth/guards/roles/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { SignUpDto } from "../auth/dto/signUpDto.dto";
import { ItemService } from "./items.service";
import { ItemUpdateDto } from "./dto/ItemUpdateDto.dto";
import { ItemCreateDto } from "./dto/ItemCreateDto.dto";

@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) {} //dichiara ed inizializza


    /* BOTH */
    @Post('create')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLE.Admin, ROLE.Gym)
    async create(@Req() req: any, @Body() body: ItemCreateDto) {
        const {userId, isAdmin} = req.user
        return await this.itemService.create(userId, body);
    }

    @Get('list')
    @UseGuards(JwtAuthGuard)
    async findAll(@Req() req: any) {
        const {userId, isAdmin, isGym} = req.user
        return await this.itemService.findAll(userId, isAdmin, isGym);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Req() req: any, @Param('id') id: string) {
        const {userId, isAdmin} = req.user
        return await this.itemService.findOneById(id, userId, isAdmin);
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLE.Admin, ROLE.Gym)
    async update(@Req() req: any, @Param('id') id: string, @Body() body: ItemUpdateDto) {
        const {userId, isAdmin} = req.user
        return await this.itemService.updateOne(id, userId, isAdmin, body);
    }

    @Put('activate/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLE.Admin, ROLE.Gym)
    async activeOne(@Req() req: any, @Param('id') id: string) {
        const {userId, isAdmin} = req.user
        return await this.itemService.activateOne(id, userId, isAdmin);
    }

    @Put('deactivate/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLE.Admin, ROLE.Gym)
    async deactivateOne(@Req() req: any, @Param('id') id: string) {
        const {userId, isAdmin} = req.user
        return await this.itemService.deactivateOne(id, userId, isAdmin);
    }


    /* ADMIN ONLY */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLE.Admin)
    async deleteOne(@Param('id') id: string) {
        return await this.itemService.deleteOne(id);
    }

}

import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt/jwt.guard";
import { ROLE } from "src/auth/guards/roles/role.enum";
import { Roles } from "src/auth/guards/roles/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { OrderService } from "./orders.service";
import { OrderUpdateDto } from "./dto/OrderUpdateDto.dto";
import { OrderCreateDto } from "./dto/OrderCreateDto.dto";

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {} //dichiara ed inizializza


    /* BOTH */
    @Post('create')
    @UseGuards(JwtAuthGuard)
    async create(@Req() req: any, @Body() body: OrderCreateDto) {
        const {userId, isAdmin} = req.user
        return await this.orderService.create(userId, body);
    }

    @Get('list')
    @UseGuards(JwtAuthGuard)
    async findAll(@Req() req: any) {
        const {userId, isAdmin} = req.user
        return await this.orderService.findAll(userId, isAdmin);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Req() req: any, @Param('id') id: string) {
        const {userId, isAdmin} = req.user
        return await this.orderService.findOneById(id, userId, isAdmin);
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    async update(@Req() req: any, @Param('id') id: string, @Body() body: OrderUpdateDto) {
        const {userId, isAdmin} = req.user
        return await this.orderService.updateOne(id, userId, isAdmin, body);
    }

    @Put('activate/:id')
    @UseGuards(JwtAuthGuard)
    async activeOne(@Req() req: any, @Param('id') id: string) {
        const {userId, isAdmin} = req.user
        return await this.orderService.activateOne(id, userId, isAdmin);
    }

    @Put('deactivate/:id')
    @UseGuards(JwtAuthGuard)
    async deactivateOne(@Req() req: any, @Param('id') id: string) {
        const {userId, isAdmin} = req.user
        return await this.orderService.deactivateOne(id, userId, isAdmin);
    }

    @Delete('cancel/:id')
    @UseGuards(JwtAuthGuard)
    async cancelOne(@Req() req: any, @Param('id') id: string) {
        const {userId, isAdmin} = req.user
        return await this.orderService.cancelOne(id, userId, isAdmin);
    }


    /* ADMIN ONLY */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ROLE.Admin)
    async deleteOne(@Param('id') id: string) {
        return await this.orderService.deleteOne(id);
    }

}

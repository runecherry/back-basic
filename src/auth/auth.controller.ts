import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logInDto.dto';
import { SignUpDto } from './dto/signUpDto.dto';
import { JwtAuthGuard } from './guards/jwt/jwt.guard';
import { Public } from './guards/pages/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signUp')
    @Public()
    async signUp(@Body() signUpDto: SignUpDto, @Req() req:Object) {
        //console.log('sign in')
        console.log(req)
        const data = await this.authService.signUp(signUpDto);
        return data
    }

    @Post('logIn')
    @Public()
    @UseGuards(JwtAuthGuard)
    async create(@Req() req:any) {
        console.log(req)
        const {headers} = req
        console.log({headers})
        const b64auth = (headers.authorization || '').split(' ')[1] || '';
        const [username, password] = Buffer.from(b64auth, 'base64')
            .toString()
            .split(':');
        const  userData: LogInDto = {username, password}

        console.log({username, password})
        //return {username, password}
        return await this.authService.logIn(userData);
    }

}

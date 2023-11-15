import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt/dist';
import { SignUpDto } from './dto/signUpDto.dto';
import { LogInDto } from './dto/logInDto.dto';
import { UserDto } from 'src/users/dto/UserDto.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService){}

    async signUp(signUpDto: SignUpDto): Promise<{token: string} | {CreationUserError: Error}>{
        const {password} = signUpDto
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await this.userService.create({
            ...signUpDto,
            password: hashPassword
        })

        console.log({newUser})
        if(newUser instanceof UserDto) {
            const token = this.jwtService.sign({id: newUser._id})
            return {token};
        }
      }

      async logIn(logInDto: LogInDto): Promise<{token: string}|{LogInError: Error}>{
        const { username, password} = logInDto
        try {
            const user = await this.userService.findOneByUsername({username})
            //console.log({user})
            if(!user)
                throw new HttpException('User not found!', 404);

            const isPasswordMatched = await bcrypt.compare(password, user.password)
            if(!isPasswordMatched)
                throw new HttpException('Password not matched!', 409);

            const token = this.jwtService.sign({id: user._id})
            return {token};
        } catch (error) {
            console.log({LogInError: error})
            return {LogInError: error}
        }
    }

    async validateUser(payload: any): Promise<{user: UserDto | null | any}> {
      //console.log({validateUser: payload})
      const user = await this.userService.findOneById(payload.id);
      //console.log({'validateUser': user})
      return {user}
    }

}

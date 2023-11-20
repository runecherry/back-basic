import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt/dist';
import { SignUpDto } from './dto/signUpDto.dto';
import { LogInDto } from './dto/logInDto.dto';
import { UserDto } from 'src/users/dto/UserDto.dto';
import { UserService } from 'src/users/users.service';
import _ from "lodash";
import {UserInfoDto} from "../users/dto/UserInfoDto.dto";
import {Public} from "./guards/pages/public.decorator";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService){}

    @Public()
    async signUp(signUpDto: SignUpDto): Promise<{token: string, user: Object} | {CreationUserError: Error}>{
        const {password} = signUpDto
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await this.userService.create({
            ...signUpDto,
            password: hashPassword
        })

        console.log('here')
        console.log({newUser})
        const token = this.jwtService.sign({id: newUser._id})
        const UserInfoDto: UserDto = newUser
        return {token, user: {username: UserInfoDto.username, email: UserInfoDto.email, role: UserInfoDto.role}};
      }

      async logIn(logInDto: LogInDto): Promise<{token: string, user: Object}|{LogInError: Error}>{
        const { username, password} = logInDto
          const user = await this.userService.findOneByUsername({username})
          //console.log({user})
          if(!user)
              throw new HttpException('User not found!', 404);

          const isPasswordMatched = await bcrypt.compare(password, user.password)
          if(!isPasswordMatched)
              throw new HttpException('Password not matched!', 409);
          const UserInfoDto: UserInfoDto = user
          const token = this.jwtService.sign({id: user._id})
          return {token, user: {username: UserInfoDto.username, email: UserInfoDto.email, role: UserInfoDto.role, name: UserInfoDto.name, surname: UserInfoDto.surname, city: UserInfoDto.city,  street: UserInfoDto.street,  zipCode: UserInfoDto.zipCode}};
    }

    async validateUser(payload: any): Promise<{user: UserDto | null | any}> {
      //console.log({validateUser: payload})
      const user = await this.userService.findOneById(payload.id);
      console.log({'validateUser': user})
      return {user}
    }

}

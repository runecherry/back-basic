import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../../auth.service";
import { ROLE } from "../roles/role.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService,
    private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    //console.log({payload})
    const { user } = await this.authService.validateUser(payload);
      if(!user)
          {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
          }
      else{
        //console.log('okk')
        return {userId: user._id, role: user.role, isAdmin: user.role === ROLE.Admin ? true : false}
      }
  }

  /*
  
  async validatePlus(payload: any, context: ExecutionContext){

    console.log('validateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

    const isPublic = this.reflector.getAllAndOverride<boolean[]>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic && isPublic[0]) {
      return true;
    }


    //get user
    const {user} = await this.authService.validateUser(payload);

      if(!user)
          {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);}
      else{
        return {user}
      }
        
  }
  */

}

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { UserModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/jwt/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>{
        return{
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRE')}
        }
      }
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}

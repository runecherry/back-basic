import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongodbKpopConfigService } from './config/mongodbKpop.config.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './orders/orders.module';
import {ItemModule} from "./items/items.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongodbKpopConfigService,
    }),
    AuthModule,
    UserModule,
      ItemModule,
    OrderModule
  ],
})
export class AppModule {}

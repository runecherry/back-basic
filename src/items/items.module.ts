import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/items/schema/item.schema';
import { ItemController } from './items.controller';
import { ItemService } from './items.service';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature(
        [
            { name: Item.name, schema: ItemSchema }
         ]
       ),
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule {}

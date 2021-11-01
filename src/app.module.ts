import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/module/task.module';
@Module({
  imports: [TaskModule,MongooseModule.forRoot('mongodb+srv://mean:1834@cluster0.y4sxi.mongodb.net/nestCrud')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

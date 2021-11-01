import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TaskController } from '../controller/task.controller';
import { ProductShcema, UserShcema } from '../model/user.model';
import { TaskService } from '../service/task.service';

@Module({
  imports: [
    MulterModule.register({
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg'
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'upload');
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: 'UserShcema', schema: UserShcema },
      { name: 'productShcema', schema: ProductShcema },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

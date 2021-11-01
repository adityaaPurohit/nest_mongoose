import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { TaskService } from '../service/task.service';

@Controller('/task')
export class TaskController {
  constructor(private userService: TaskService) {}

  @Post('/register')
  @UseInterceptors(FileInterceptor('Img'))
  async createUser(
    @Res() res,
    @Req() req,
    @Body() body,
    @UploadedFile() Img: Express.Multer.File,
  ) {
    const Image = Img.path;
    console.log(Image);
    console.log(Img);

    const { firstName, lastname, email, password } = req.body;
    const data = { firstName, lastname, email, password, Image };
    const user = await this.userService.registerUser(data);

    return res.status(200).send({
      message: 'User regisered successfully!!',
      status: 200,
      data: user,
    });
  }

  @Post('/login')
  async signinUser(@Res() res, @Req() req, @Body() body) {
    const { email, password } = req.body;

    const user = await this.userService.loginuser(req.body);

    return res
      .status(200)
      .send({ message: 'login successfull', status: 200, data: user });
  }

  @Get('/allUser')
  async getAlluser(@Res() res) {
    const user = await this.userService.alluser();
    // return res.sendFile('/public/uploads', '/public/uploads')
    res.status(200).send({ message: 'successfull', status: 200, data: user });
  }

  @Put('/update')
  async editProfile(@Res() res, @Req() req, @Body() body) {
    const { firstName, lastName, email } = req.body;
    const user = await this.userService.updateuser(req.body);

    return res
      .status(200)
      .send({ message: 'successfull', status: 200, data: user });
  }

  @Delete('/delete')
  async deletedUser(@Res() res, @Req() req, @Body() body) {
    const { email } = req.body;
    const user = await this.userService.deleteUser(req.body);

    return res
      .status(200)
      .send({ message: 'Deleted successfull', status: 200, data: user });
  }
  @Post('upload1')
  @UseInterceptors(FileInterceptor('Image'))
  async uploadFile(@Res() res, @UploadedFile() Image: Express.Multer.File) {
    try {
      console.log(Image.path);
      const user = await this.userService.createImage(Image);

      return res
        .status(200)
        .send({ message: 'Image Upload successfull', status: 200, data: user });
    } catch (error) {
      console.log(error);

      //   return res.sendFile(join('/public/uploads', '/public/uploads'));
      res.status(400).send({
        message: 'Image Upload Failed',
        status: 400,
        data: error.message,
      });
    }
  }

  @Post('/createProduct')
  async createproduct(@Res() res, @Body() body) {
    console.log("body",body);
    
    const { productName, productType, productDiscription } = body;
    const user = await this.userService.registerProduct(body);

    return res.status(200).send({
      message: 'Product regisered successfully!!',
      status: 200,
      data: user,
    });
  }
}

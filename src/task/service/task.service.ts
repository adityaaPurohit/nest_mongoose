import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, User } from '../interface/user.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class TaskService {
  constructor(
    @InjectModel('UserShcema') private readonly userModel: Model<User>,
    @InjectModel('productShcema') private readonly productModel: Model<Product>,
  ) {}

  async registerUser(data: any): Promise<User> {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const insertUser = await new this.userModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashPassword,
      Image: data.Image,
    });

    const userCheck = await this.userModel.findOne({ email: data.email });

    if (userCheck) {
      throw new HttpException('User is already exist!!', HttpStatus.FORBIDDEN);
    } else {
      return insertUser.save();
    }
  }

  async loginuser(data: any): Promise<User> {
    const checkUser = await this.userModel.findOne({ email: data.email });

    if (!checkUser) {
      throw new HttpException('User not found!!', HttpStatus.FORBIDDEN);
    } else {
      const user = await bcrypt.compare(data.password, checkUser.password);
      if (user == false) {
        throw new HttpException('Entered wrong password', HttpStatus.FORBIDDEN);
      } else {
        return checkUser;
      }
    }
  }

  async alluser() {
    const getuser = await this.userModel.find();
    if (!getuser) {
      throw new HttpException(
        'Have some error, no user found',
        HttpStatus.FORBIDDEN,
      );
    } else {
      return getuser;
    }
  }

  async updateuser(data: any) {
    const user = await this.userModel.findOneAndUpdate(
      { email: data.email },
      { firstName: data.firstName, lastName: data.lastName },
    );
    if (!user) {
      throw new HttpException(
        'Have some error, no user found',
        HttpStatus.FORBIDDEN,
      );
    } else {
      return user;
    }
  }

  async deleteUser(data: any) {
    const user = await this.userModel.findOneAndDelete({ email: data.email });
    if (!user) {
      throw new HttpException(
        'Have some error, no user found',
        HttpStatus.FORBIDDEN,
      );
    } else {
      return user;
    }
  }

  async createImage(Image) {
    const user = await this.userModel.create({ Image });
    if (!user) {
      throw new HttpException(
        'Have some error, no user found',
        HttpStatus.FORBIDDEN,
      );
    } else {
      return user;
    }
  }

  async registerProduct(data) {
    console.log(data);

    const user = await this.productModel.create(data);
    console.log('user', user);

    if (!user) {
      throw new HttpException(
        'Have some error, no user found',
        HttpStatus.FORBIDDEN,
      );
    } else {
      return user;
    }
  }
  //   async getImage(){
  //       const user = await this.userModel.find
  //   }
}

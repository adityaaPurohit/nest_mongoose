import * as mongoose from 'mongoose';

const UserShcema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  Image: String,
});


const ProductShcema = new mongoose.Schema({
  productName: String,
  productType:String,
  productDiscription:String
});


export { UserShcema,ProductShcema };

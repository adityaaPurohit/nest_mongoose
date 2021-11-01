import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstName: String;
  readonly lastName: String;
  readonly email: String;
  readonly password: String;
}

export interface Product extends Document {
  readonly productName: String;
  readonly productType: String;
  readonly productDiscription :String
}

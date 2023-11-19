/* eslint-disable prettier/prettier */
import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';

export class ValidateAdminProfile {
  id: number;
  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message: 'Name must be string',
  })
  @MaxLength(30)
  name: string;

  @IsEmail()
  email: string;

  @Length(2, 30, {
    message: 'Leanth can not be less than 2 and more than 30 character.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must be minimum 8 characters, at least one letter, one number and one special character',
  })
  password: string;

  imageName: string;
}

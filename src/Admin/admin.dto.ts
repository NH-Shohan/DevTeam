/* eslint-disable prettier/prettier */
import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';
import { UsersEntity } from 'src/Relation/user.entity';

export class ValidateAdminProfile {
  id: number;
  @IsString()
  @Length(4, 30, {
    message: 'Name must be between 4 and 30 characters',
  })
  name: string;

  @IsString()
  @Matches(/^[a-z0-9]+$/, {
    message: 'Username must contain only lowercase letters and numbers',
  })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Length(8, undefined, {
    message: 'Password must be at least 8 characters',
  })
  @Matches(/^(?=.*[A-Z])/i, {
    message: 'Password must contain at least 1 uppercase letter',
  })
  password: string;

  @Length(10, 10, {
    message: 'Invalid National ID',
  })
  nationalId: string;

  // You may need additional validation rules for the photo property

  // @MaxLength(30, {
  //   message: 'Image name must be at most 30 characters',
  // })
  imageName: string;

  // Ensure to match the DTO with the form structure
  photo: string; // Assuming it's a FileList, you may need to adjust this based on your form implementation

  role: 'executive' | 'moderator';

  permissions: ('creating' | 'adding' | 'deleting')[];
  user: UsersEntity;
}

export class ValidateModeratorProfile {
  id: number;
  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message: 'Name must be string',
  })
  @MaxLength(30)
  name: string;

  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@admin\.moderator\.com$/, {
    message: 'Email must be in the format someone@admin.moderator.com',
  })
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

  user: UsersEntity;
}

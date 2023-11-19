import {
  IsArray,
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class ProfileDTO {
  id: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message: 'Name must be string',
  })
  name: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsLowercase()
  gitHubUsername: string;

  profilePicture: string;

  @IsNotEmpty()
  @MaxLength(2000)
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsArray()
  contactInformation: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsUrl()
  socialMediaLinks: string;

  @IsNotEmpty()
  @IsString()
  education: string;

  @IsNotEmpty()
  @IsArray()
  projects: string;

  @IsNotEmpty()
  experiences: number;
}

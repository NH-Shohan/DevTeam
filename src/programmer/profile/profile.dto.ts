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
import { CertificationEntity } from '../certifications/certification.entity';
import { UsersEntity } from 'src/Relation/user.entity';

export class ProfileDTO {
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(4, 30, {
    message: 'Name must be between 4 and 30 characters',
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

  imageName: string;

  // Ensure to match the DTO with the form structure
  photo: string;

  @IsNotEmpty()
  @MaxLength(2000)
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsString()
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
  @IsString()
  projects: string;

  @IsNotEmpty()
  experiences: number;

  profile: CertificationEntity[];

  user: UsersEntity;
}

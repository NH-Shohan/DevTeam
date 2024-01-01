// create-recruiter.dto.ts
import { IsString, IsEmail, Length, Matches } from 'class-validator';
import { UsersEntity } from 'src/Relation/user.entity';

export class ValidateRecruiterProfile {
  id: number;
  @IsString()
  @Length(4, 30, {
    message: 'Name must be between 4 and 30 characters',
  })
  name: string;

  @IsString()
  @Length(4, 30, {
    message: 'Username must be between 4 and 30 characters',
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

  imageName: string; // Assuming it's a FileList, adjust as needed

  photo: string; // Assuming it's a FileList, adjust as needed

  expertiseSkills: string[];

  projectLinks: string[];

  @IsString()
  linkedInLink: string;

  user: UsersEntity;
}

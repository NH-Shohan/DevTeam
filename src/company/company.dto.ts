// create-company.dto.ts
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateCompanyDTO {
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
  password: string;

  imageName: string; // Assuming it's a FileList, adjust as needed

  photo: string; // Assuming it's a FileList, adjust as needed

  @IsString()
  ownerName: string;

  @IsString()
  licenseNo: string;

  @IsString()
  ownerNID: string;
}

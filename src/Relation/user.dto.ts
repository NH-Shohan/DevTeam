import { IsEmail, IsIn } from 'class-validator';

export class CreateUserDTO {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsIn(['admin', 'recruiter', 'company', 'programmer'], {
    message: 'Invalid role',
  })
  role: 'admin' | 'recruiter' | 'company' | 'programmer';
}

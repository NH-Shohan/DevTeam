import { IsString, Matches, MaxLength } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must be minimum 8 characters, at least one letter, one number, and one special character',
  })
  @MaxLength(30)
  newPassword: string;
}

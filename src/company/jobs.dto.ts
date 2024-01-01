// create-available-jobs.dto.ts
import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsNumber,
  ArrayNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateAvailableJobsDTO {
  @IsString()
  jobDescription: string;

  @IsString()
  jobRole: string;

  @IsNumber()
  jobSeat: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  jobExpireDate: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  joiningDate: Date;

  @ArrayNotEmpty()
  requiredSkills: string[];

  @IsEmail()
  company_email: string; // Make sure to validate that it's an email

  @IsEmail()
  interviewer: string; // Assuming it's an array of recruiter emails
}

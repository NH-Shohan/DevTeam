import { Type } from 'class-transformer';
import { IsDate, IsString, MaxLength } from 'class-validator';

export class ExperienceDTO {
  id: number;

  @IsString()
  @MaxLength(100)
  jobTitle: string;

  @IsString()
  @MaxLength(100)
  company: string;

  @IsString()
  @MaxLength(100)
  location: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @MaxLength(500)
  description: string;
}

import { Type } from 'class-transformer';
import { IsArray, IsDate, IsString, IsUrl, MaxLength } from 'class-validator';

export class ProjectDTO {
  id: number;

  @IsString()
  @MaxLength(100)
  projectName: string;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsDate()
  @Type(() => Date)
  dateStarted: Date;

  @IsDate()
  @Type(() => Date)
  dateCompleted: Date;

  @IsArray()
  technologiesUsed: string[];

  @IsUrl()
  projectLink: string;
}

import { Type } from 'class-transformer';
import { IsDate, IsString, MaxLength } from 'class-validator';

export class CertificationDTO {
  @IsString()
  @MaxLength(100)
  certificationName: string;

  @IsString()
  @MaxLength(100)
  issuingOrganization: string;

  @IsDate()
  @Type(() => Date)
  issueDate: Date;

  @IsDate()
  @Type(() => Date)
  expirationDate: Date;
}

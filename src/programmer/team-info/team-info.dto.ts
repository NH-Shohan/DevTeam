import { IsArray, IsString, Matches, MaxLength } from 'class-validator';

export class TeamInfoDTO {
  id: number;

  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message: 'Name must be string',
  })
  @MaxLength(30)
  teamName: string;

  @IsArray()
  teamMembers: string;

  @MaxLength(500)
  description: string;
}

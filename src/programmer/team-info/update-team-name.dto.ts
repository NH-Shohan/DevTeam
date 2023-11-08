import { IsString, Matches, MaxLength } from 'class-validator';

export class UpdateTeamNameDTO {
  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message: 'Name must be string',
  })
  @MaxLength(30)
  newTeamName: string;
}

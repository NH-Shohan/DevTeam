import { IsUrl } from 'class-validator';

export class UpdateProjectLinkDTO {
  @IsUrl()
  newProjectLink: string;
}

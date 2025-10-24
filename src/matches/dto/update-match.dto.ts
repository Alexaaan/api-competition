import { ApiProperty } from "@nestjs/swagger";
export class UpdateMatchDto {

  @ApiProperty({ example: 1, description: 'Score du joueur 1', required: false })
  score_user1?: number;

  @ApiProperty({ example: 2, description: 'Score du joueur 2', required: false })
  score_user2?: number;
}

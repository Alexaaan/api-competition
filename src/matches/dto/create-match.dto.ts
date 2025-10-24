import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchDto {
  @ApiProperty({ example: 1, description: 'ID du premier utilisateur' })
  @IsInt()
  @IsNotEmpty()
  user1: number;

  @ApiProperty({ example: 2, description: 'ID du second utilisateur' })
  @IsInt()
  @IsNotEmpty()
  user2: number;

  @ApiProperty({ example: 3, description: 'Score du joueur 1', required: false })
  @IsOptional()
  @IsInt()
  score_user1?: number;

  @ApiProperty({ example: 4, description: 'Score du joueur 2', required: false })
  @IsOptional()
  @IsInt()
  score_user2?: number;
}

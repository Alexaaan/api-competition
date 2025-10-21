import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsInt()
  @IsNotEmpty()
  user1: number;

  @IsInt()
  @IsNotEmpty()
  user2: number;

  @IsOptional()
  @IsInt()
  score_user1?: number;

  @IsOptional()
  @IsInt()
  score_user2?: number;
}

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({example: 1, description:'Token de rafraichissement', required: false })
  @IsNotEmpty()
  refresh_token: string;
}

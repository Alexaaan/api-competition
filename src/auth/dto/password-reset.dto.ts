import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetDto {
  @ApiProperty({example: 1, description:'Adresse email', required: false })
  @IsEmail()
  email: string;
}

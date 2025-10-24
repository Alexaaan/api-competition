import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({example: 1, description:'Adresse email', required: false })
  @IsEmail()
  email: string;

  @ApiProperty({example: 2, description:'Mot de passe', required: false })
  @IsNotEmpty()
  password: string;
}

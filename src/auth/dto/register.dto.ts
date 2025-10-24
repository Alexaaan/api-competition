import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 1, description: 'Nom d utilisateur', required: false })
  @IsString()
  username: string;

  @ApiProperty({example: 2, description:'Adresse email', required: false })
  @IsEmail()
  email: string;

  @ApiProperty({example: 3, description:'Mot de passe', required: false })
  @IsString()
  password: string;

  @ApiProperty({example: 4, description:'role (user/admin)', required: false })
  @IsOptional()
  @IsString()
  role?: string;
}

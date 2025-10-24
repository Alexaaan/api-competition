import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  
  @ApiProperty({ example: 1, description: 'Nom d utilisateur', required: false })
  username?: string;
  @ApiProperty({example: 2, description:'Adresse email', required: false })
  email?: string;
  @ApiProperty({example: 3, description:'Mot de passe', required: false })
  password?: string;
  @ApiProperty({example: 4, description:'role (user/admin)', required: false })
  role?: string;
}

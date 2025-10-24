import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { Request } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('authentification')
@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @ApiOperation({ summary: 'Création de compte (enregistrement utilisateur)' })
  @ApiResponse({ status: 201, description: 'Compte créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @ApiOperation({ summary: 'Connexion d’un utilisateur existant' })
  @ApiResponse({ status: 200, description: 'Connexion réussie, JWT renvoyé.' })
  @ApiResponse({ status: 401, description: 'Identifiants invalides.' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Déconnexion (nécessite un token JWT valide)' })
  @ApiResponse({ status: 200, description: 'Utilisateur déconnecté.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    const user = req['user'];
    return this.authService.logout(user.sub);
  }

  @ApiOperation({ summary: 'Rafraîchir le token JWT (refresh token)' })
  @ApiResponse({ status: 200, description: 'Nouveau token d’accès renvoyé.' })
  @ApiResponse({ status: 400, description: 'Refresh token invalide ou expiré.' })
  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refresh_token);
  }
  @ApiOperation({ summary: 'Demande de réinitialisation de mot de passe' })
  @ApiResponse({ status: 200, description: 'E-mail de réinitialisation envoyé.' })
  @ApiResponse({ status: 404, description: 'Adresse e-mail inconnue.' })
  @Post('password-reset')
  passwordReset(@Body() dto: PasswordResetDto) {
    return this.authService.passwordReset(dto.email);
  }
}

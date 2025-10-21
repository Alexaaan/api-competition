import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private refreshTokens = new Map<number, string>(); // stockage simple en mémoire

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      ...dto,
      password: hashed,
      role: 'player',
    });
    return { message: 'Utilisateur créé', user };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    this.refreshTokens.set(user.id, refresh_token);

    return { access_token, refresh_token };
  }

  async logout(userId: number) {
    this.refreshTokens.delete(userId);
    return { message: 'Déconnexion réussie' };
  }

  async refresh(refresh_token: string) {
    try {
      const decoded = this.jwtService.verify(refresh_token);
      const stored = this.refreshTokens.get(decoded.sub);
      if (stored !== refresh_token)
        throw new UnauthorizedException('Refresh token invalide');

      const payload = {
        sub: decoded.sub,
        username: decoded.username,
        role: decoded.role,
      };
      const newAccess = this.jwtService.sign(payload, { expiresIn: '1h' });
      return { access_token: newAccess };
    } catch {
      throw new UnauthorizedException('Refresh token invalide ou expiré');
    }
  }

  async passwordReset(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return { message: "Aucun utilisateur avec cet email" };
    // Dans un vrai système, tu enverrais un email ici
    return { message: `Lien de réinitialisation envoyé à ${email}` };
  }
}

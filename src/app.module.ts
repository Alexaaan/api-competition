import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'competition.db', // fichier DB local
      autoLoadEntities: true,
      synchronize: true, // crée automatiquement les tables
    }),
    UsersModule,
    MatchesModule,
    AuthModule,
  ],
})
export class AppModule {}

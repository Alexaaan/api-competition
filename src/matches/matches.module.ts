import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, User]), // ← inclut User si tu l'utilises
  ],
  providers: [MatchesService],
  controllers: [MatchesController],
})
export class MatchesModule {}

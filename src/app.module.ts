import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'competition.db', 
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UsersModule,
    MatchesModule,
    AuthModule,
  ],
})
export class AppModule {}

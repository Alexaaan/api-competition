import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]) // ← c'est indispensable !
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // pour que d'autres modules puissent l'utiliser
})
export class UsersModule {}

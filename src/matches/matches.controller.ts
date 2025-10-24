import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';


ApiTags('matches') //Swagger
@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}

  @ApiOperation({ summary: 'Créer un nouveau match' })
  @ApiResponse({ status: 201, description: 'Match créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @Post()
  create(@Body() dto: CreateMatchDto) {
    return this.matchesService.create(dto);
  }

  @ApiOperation({ summary: 'Récupérer la liste de tous les matchs' })
  @ApiResponse({ status: 200, description: 'Liste de matchs renvoyée.' })
  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un match par ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Match trouvé.' })
  @ApiResponse({ status: 404, description: 'Match introuvable.' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.matchesService.findById(+id);
  }

  @ApiOperation({ summary: 'Mettre à jour un match existant' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Match mis à jour.' })
  @ApiResponse({ status: 404, description: 'Match introuvable.' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMatchDto) {
    return this.matchesService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Supprimer un match (réservé aux admins)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Match supprimé.' })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.matchesService.remove(+id);
  }
}

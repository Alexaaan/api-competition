import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}

  @Post()
  create(@Body() dto: CreateMatchDto) {
    return this.matchesService.create(dto);
  }

  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.matchesService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMatchDto) {
    return this.matchesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.matchesService.remove(+id); // admin only (à protéger plus tard)
  }
}

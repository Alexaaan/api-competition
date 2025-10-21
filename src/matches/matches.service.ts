import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async create(dto: CreateMatchDto) {
    const match = this.matchRepository.create(dto);
    return await this.matchRepository.save(match);
  }

  findAll() {
    return this.matchRepository.find();
  }

  async findById(id: number) {
    const match = await this.matchRepository.findOne({ where: { id } });
    if (!match) throw new NotFoundException('Match non trouvé');
    return match;
  }

  async update(id: number, dto: UpdateMatchDto) {
    const match = await this.findById(id);
    Object.assign(match, dto);
    return this.matchRepository.save(match);
  }

  async remove(id: number) {
    const match = await this.findById(id);
    return this.matchRepository.remove(match);
  }
}

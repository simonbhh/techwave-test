import { Injectable, NotFoundException } from '@nestjs/common';
import { Genre } from '../model/entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreDto } from '../model/dto/genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  createGenre(genreDto: GenreDto): Promise<Genre> {
    return this.genreRepository.save({ name: genreDto.name });
  }

  async deleteGenre(id: number): Promise<void> {
    const genre: Genre = await this.genreRepository.findOneBy({ id });
    if (!genre) {
      throw new NotFoundException(`Genre not found`);
    }
    this.genreRepository.delete(id);
  }
}

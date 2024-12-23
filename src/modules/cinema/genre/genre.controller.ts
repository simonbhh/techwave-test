import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import Constants from 'src/utils/constants';
import { GenreService } from '../genre/genre.service';
import { GenreDto } from '../model/dto/genre.dto';
import { Genre } from '../model/entities/genre.entity';

@Controller(Constants.GENRES_API)
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Post()
  @HttpCode(201)
  createGenre(@Body() genreDto: GenreDto): Promise<Genre> {
    return this.genreService.createGenre(genreDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteGenre(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.genreService.deleteGenre(id);
  }
}

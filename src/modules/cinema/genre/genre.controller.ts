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
import { ApiOperation } from '@nestjs/swagger';

@Controller(Constants.GENRES_API)
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOperation({ summary: 'List all genres' })
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new genre' })
  createGenre(@Body() genreDto: GenreDto): Promise<Genre> {
    return this.genreService.createGenre(genreDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete an existing genre' })
  deleteGenre(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.genreService.deleteGenre(id);
  }
}

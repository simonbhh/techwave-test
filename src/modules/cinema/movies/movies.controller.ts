import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import Constants from 'src/utils/constants';
import { MovieDto } from '../model/dto/movie.dto';
import { Movie } from '../model/entities/movie.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller(Constants.MOVIES_API)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'List all movies' })
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new movie' })
  createMovie(@Body() movieDto: MovieDto): Promise<Movie> {
    return this.moviesService.createMovie(movieDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing movie' })
  updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() movieDto: MovieDto,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(id, movieDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete an existing movie' })
  deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moviesService.deleteMovie(id);
  }

  @Get(`${Constants.SEARCH_API}/:search`)
  @ApiOperation({ summary: 'Search by genre or movie name' })
  searchByNameOrGenre(@Param('search') value: string): Promise<Movie[]> {
    return this.moviesService.searchByNameOrGenre(value);
  }
}

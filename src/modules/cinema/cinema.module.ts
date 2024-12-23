import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './model/entities/movie.entity';
import { Genre } from './model/entities/genre.entity';
import { MoviesController } from './movies/movies.controller';
import { GenreController } from './genre/genre.controller';
import { MoviesService } from './movies/movies.service';
import { GenreService } from './genre/genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  controllers: [MoviesController, GenreController],
  providers: [MoviesService, GenreService],
})
export class CinemaModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../model/entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { MovieDto } from '../model/dto/movie.dto';
import { Genre } from '../model/entities/genre.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async createMovie(movieDto: MovieDto): Promise<Movie> {
    const genres: Genre[] = await this.genresRepository.find({
      where: movieDto.genres.map((genre) => ({ name: ILike(genre) })),
    });
    return this.moviesRepository.save({
      title: movieDto.title,
      description: movieDto.description,
      releaseDate: movieDto.releaseDate,
      genres,
    });
  }

  async updateMovie(id: number, movieDto: MovieDto): Promise<Movie> {
    const movie: Movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie not found`);
    }

    const genres: Genre[] = await this.genresRepository.find({
      where: movieDto.genres.map((genre) => ({ name: ILike(genre) })),
    });
    movie.title = movieDto.title;
    movie.description = movieDto.description;
    movie.releaseDate = movieDto.releaseDate;
    movie.genres = genres;

    return this.moviesRepository.save(movie);
  }

  async deleteMovie(id: number): Promise<void> {
    const movie: Movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie not found`);
    }
    this.moviesRepository.delete(id);
  }

  searchByNameOrGenre(value: string): Promise<Movie[]> {
    return this.moviesRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre')
      .where('movie.title ILIKE :value', { value: `%${value}%` })
      .orWhere('genre.name ILIKE :value', { value: `%${value}%` })
      .getMany();
  }
}

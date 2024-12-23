-- Database creation script
CREATE DATABASE "techwave-cinema"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table creation script
CREATE TABLE IF NOT EXISTS public.genre
(
    id serial NOT NULL,
    name character varying NOT NULL,
    CONSTRAINT PK_genre PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.movie
(
    id serial NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    release_date date NOT NULL,
    CONSTRAINT PK_movie PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.movie_genre
(
    movie_id integer NOT NULL,
    genre_id integer NOT NULL,
    CONSTRAINT PK_movie_genre PRIMARY KEY (movie_id, genre_id),
    CONSTRAINT FK_movie_genre_genre_id FOREIGN KEY (genre_id)
        REFERENCES public.genre (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT FK_movie_genre_movie_id FOREIGN KEY (movie_id)
        REFERENCES public.movie (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

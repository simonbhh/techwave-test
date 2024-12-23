import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CinemaModule } from './modules/cinema/cinema.module';
import { DatabaseModule } from './config/database.module';
import { ConfigModule } from '@nestjs/config';
import { requestLogger } from './config/middleware/logger.middleware';
import Constants from './utils/constants';

@Module({
  imports: [ConfigModule.forRoot({}), DatabaseModule, CinemaModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(requestLogger)
      .forRoutes(Constants.MOVIES_API, Constants.GENRES_API);
  }
}

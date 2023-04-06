/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './@shared/config/config.module';
import { CorrelationMiddleware } from './correlation.middleware';
import { SharedModule } from './@shared/shared.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, SharedModule],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

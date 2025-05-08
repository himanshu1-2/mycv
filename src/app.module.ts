import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/report.entity';
import { User } from './users/user.entity';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session')
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Report,User],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_PIPE,
    useValue:new ValidationPipe({
      whitelist: true
    })
  }],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(cookieSession({
      keys:['asdf']
    })).forRoutes('*')
  }
}

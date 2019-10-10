import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectController } from './project/project.controller';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [ProjectModule],
  controllers: [AppController, ProjectController],
  providers: [AppService],
})
export class AppModule {}

import {
  Module,
  forwardRef,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { AppModule } from "../app.module";
import { ConfigService } from "../config/config.service";

@Module({
  providers: [ProjectsService, ConfigService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
  imports: [forwardRef(() => AppModule)]
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}

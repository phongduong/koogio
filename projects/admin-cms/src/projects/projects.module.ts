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
import { SercureApiMiddleware } from "../middlewares/sercure-api.middleware";
import { RouterModule } from "nest-router";

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
  imports: [forwardRef(() => AppModule)]
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SercureApiMiddleware)
      .forRoutes(
        { path: "api/v1/projects", method: RequestMethod.POST },
        { path: "api/v1/projects", method: RequestMethod.PUT },
        { path: "api/v1/projects", method: RequestMethod.DELETE }
      );
  }
}

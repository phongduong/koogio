import {
  Module,
  forwardRef,
  NestModule,
  MiddlewareConsumer
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { AppModule } from "../app.module";
import { SercureApiMiddleware } from "../middlewares/sercure-api.middleware";
import { RouterModule } from "nest-router";

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [forwardRef(() => AppModule)]
})
export class FilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SercureApiMiddleware)
      .forRoutes(RouterModule.resolvePath(FilesController));
  }
}

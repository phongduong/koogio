import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectsController } from "./projects/projects.controller";
import { ProjectsService } from "./projects/projects.service";
import { ConfigService } from "./config/config.service";
import { FirebaseService } from "./firebase/firebase.service";
import { ImagesController } from "./images/images.controller";
import { ImagesService } from "./images/images.service";
import { SecureRouteMiddleware } from "./secure-route.middleware";

@Module({
  controllers: [AppController, ProjectsController, ImagesController],
  providers: [
    AppService,
    ConfigService,
    FirebaseService,
    ImagesService,
    ProjectsService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecureRouteMiddleware).forRoutes(ProjectsController);
    consumer.apply(SecureRouteMiddleware).forRoutes(ImagesController);
    consumer
      .apply(SecureRouteMiddleware)
      .exclude({ path: "/sign-in", method: RequestMethod.GET })
      .forRoutes(AppController);
  }
}

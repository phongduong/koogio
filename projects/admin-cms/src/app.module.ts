import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigService } from "./config/config.service";
import { FirebaseService } from "./firebase/firebase.service";
import { SecureRouteMiddleware } from "./middlewares/secure-route.middleware";
import { UnsecureRouteMiddleware } from "./middlewares/unsecure-route.middleware";
import { ApiModule } from "./api/api.module";
import { ProjectsModule } from "./projects/projects.module";
import { FilesModule } from "./files/files.module";
import { RouterModule, Routes } from "nest-router";

const routes: Routes = [
  {
    path: "api/v1",
    module: ApiModule,
    children: [
      {
        path: "/",
        module: ProjectsModule
      },
      {
        path: "/",
        module: FilesModule
      }
    ]
  }
];
@Module({
  controllers: [AppController],
  providers: [AppService, ConfigService, FirebaseService],
  exports: [FirebaseService],
  imports: [
    RouterModule.forRoutes(routes),
    forwardRef(() => ProjectsModule),
    forwardRef(() => FilesModule)
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(SecureRouteMiddleware)
    //   .exclude({ path: "/sign-in", method: RequestMethod.GET })
    //   .forRoutes(AppController);
    // consumer
    //   .apply(UnsecureRouteMiddleware)
    //   .forRoutes({ path: "/sign-in", method: RequestMethod.GET });
  }
}

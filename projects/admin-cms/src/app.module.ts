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
    forwardRef(() => FilesModule),
    ApiModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}

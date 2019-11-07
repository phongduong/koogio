import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectsController } from "./projects/projects.controller";
import { ProjectsModule } from "./projects/projects.module";
import { ConfigService } from "./config/config.service";
import { FirebaseService } from "./firebase/firebase.service";
import { ImagesController } from "./images/images.controller";
import { ImagesService } from "./images/images.service";

@Module({
  imports: [ProjectsModule],
  controllers: [AppController, ProjectsController, ImagesController],
  providers: [AppService, ConfigService, FirebaseService, ImagesService]
})
export class AppModule {}

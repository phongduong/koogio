import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectController } from "./project/project.controller";
import { ProjectModule } from "./project/project.module";
import { ConfigService } from "./config/config.service";
import { FirebaseService } from "./firebase/firebase.service";
import { ImageController } from "./image/image.controller";
import { ImageService } from "./image/image.service";

@Module({
  imports: [ProjectModule],
  controllers: [AppController, ProjectController, ImageController],
  providers: [AppService, ConfigService, FirebaseService, ImageService],
})
export class AppModule {}

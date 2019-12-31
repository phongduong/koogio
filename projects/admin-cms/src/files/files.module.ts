import { Module, forwardRef } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { AppModule } from "../app.module";

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [forwardRef(() => AppModule)]
})
export class FilesModule {}

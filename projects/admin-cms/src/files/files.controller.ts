import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
  HttpStatus
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";
import { diskStorage } from "multer";

const storage = diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
});

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post("upload")
  @UseInterceptors(FilesInterceptor("files", 4, { storage }))
  async uploadFiles(@Res() res, @UploadedFiles() files): Promise<string[]> {
    return await this.filesService
      .upload(files)
      .then(urls => res.status(HttpStatus.CREATED).json({ urls }))
      .catch(error =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: error.message })
      );
  }
}

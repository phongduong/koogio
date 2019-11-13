import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
  HttpStatus
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ImagesService } from "./images.service";
import { diskStorage } from "multer";

const storage = diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
});

@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post("upload")
  @UseInterceptors(FilesInterceptor("files", 4, { storage }))
  async uploadImages(@Res() res, @UploadedFiles() files): Promise<string[]> {
    return await this.imagesService
      .upload(files)
      .then(urls => res.status(HttpStatus.CREATED).json({ urls }))
      .catch(error =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: error.message })
      );
  }
}

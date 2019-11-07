import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
  HttpStatus,
  Body
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
  constructor(private readonly imageService: ImagesService) {}

  @Post("upload")
  @UseInterceptors(FilesInterceptor("files", 4, { storage }))
  async uploadImages(
    @Res() res,
    @UploadedFiles() files,
    @Body() body
  ): Promise<string[]> {
    console.log(body)
    return await this.imageService
      .upload(files)
      .then(urls => res.json({ urls }))
      .catch(error =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: error.message })
      );
  }
}

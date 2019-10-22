import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/screenshots')
  @UseInterceptors(FilesInterceptor('screenshots', 4, { storage }))
  async uploadFile(@Res() res, @UploadedFiles() files): Promise<any[]> {
    return await this.imageService
      .upload(files)
      .then(urls => res.json({ urls }))
      .catch(error =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: error.message }),
      );
  }
}

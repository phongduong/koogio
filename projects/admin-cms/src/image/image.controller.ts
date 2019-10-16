import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
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

  @Post('upload')
  @UseInterceptors(FilesInterceptor('screenshots', 4, { storage }))
  uploadFile(@UploadedFiles() files) {
    this.imageService.upload(files);
  }
}

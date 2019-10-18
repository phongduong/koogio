import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ImageService {
  private readonly bucket;

  constructor(private readonly firebaseService: FirebaseService) {
    this.bucket = firebaseService.getBucket();
  }

  async upload(images): Promise<any[]> {
    const paths = images.map(image => image.path);
    const uploadOptions = { gzip: true, public: true };

    return await Promise.all(
      paths.map(path => this.bucket.upload(path, uploadOptions)),
    )
      .then(response => response.map(file => file[1]))
      .then(files => files.map(file => file.mediaLink));
  }
}

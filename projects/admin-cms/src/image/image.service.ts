import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ImageService {
  private readonly bucket;

  constructor(private readonly firebaseService: FirebaseService) {
    this.bucket = firebaseService.getBucket('screenshots');
  }

  upload(images) {
    const paths = images.map(image => image.path);

    this.bucket.upload(paths, (err, files, apiResponse) => {});
  }
}

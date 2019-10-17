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

    try {
      const response = await Promise.all(
        paths.map(async path => this.bucket.upload(path)),
      );
      const urls = await Promise.all(
        paths.map(async path =>
          this.bucket.file(path).getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: '12-12-2500',
          }),
        ),
      );

      return [];
    } catch (error) {
      console.log(error);
    }
  }
}

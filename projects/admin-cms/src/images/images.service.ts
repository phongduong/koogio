import { Injectable } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class ImagesService {
  private readonly bucket;

  constructor(private readonly firebaseService: FirebaseService) {
    this.bucket = firebaseService.getBucket();
  }

  async upload(images): Promise<string[]> {
    const paths = images.map(image => image.path);
    const uploadOptions = { gzip: true, public: true };

    return await Promise.all(
      paths.map(path => this.bucket.upload(path, uploadOptions))
    )
      .then(response => response.map(file => file[1]))
      .then(files => files.map(file => file.mediaLink));
  }
}

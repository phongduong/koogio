import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private serviceAccount: { [key: string]: string };

  constructor(config: ConfigService) {
    this.serviceAccount = JSON.parse(config.get('SERVICE_ACCOUNT'));

    admin.initializeApp(this.serviceAccount);
  }

  getBucket(name: string) {
    return admin.storage().bucket(name);
  }
}

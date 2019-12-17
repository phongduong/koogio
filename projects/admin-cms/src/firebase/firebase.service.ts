import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import * as admin from "firebase-admin";

@Injectable()
export class FirebaseService {
  private serviceAccount: { [key: string]: string };

  constructor(config: ConfigService) {
    this.serviceAccount = JSON.parse(config.get("SERVICE_ACCOUNT"));

    admin.initializeApp({
      credential: admin.credential.cert(this.serviceAccount),
      storageBucket: "gs://koogio.appspot.com/"
    });
  }

  getBucket() {
    return admin.storage().bucket();
  }

  getFirestore() {
    return admin.firestore();
  }

  getAuth() {
    return admin.auth()
  }
}

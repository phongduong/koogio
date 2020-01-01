import { Injectable, NestMiddleware, HttpStatus } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class SercureApiMiddleware implements NestMiddleware {
  private readonly auth;

  constructor(private readonly firebaseService: FirebaseService) {
    this.auth = firebaseService.getAuth();
  }

  async use(req: any, res: any, next: () => void) {
    if (!req.headers?.authorization) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: "Unauthorized" });
    }

    try {
      const accessToken = req.headers?.authorization;
      await this.auth.verifyIdToken(accessToken);

      next();
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: "Unauthorized" });
    }
  }
}

import { Injectable, NestMiddleware } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class SecureRouteMiddleware implements NestMiddleware {
  private readonly auth;

  constructor(private readonly firebaseService: FirebaseService) {
    this.auth = firebaseService.getAuth();
  }

  async use(req: any, res: any, next: () => void) {
    if (!req.cookies.idToken) {
      return res.redirect("/sign-in");
    }

    try {
      const idToken = req.cookies.idToken;
      await this.auth.verifyIdToken(idToken);

      next();
    } catch (error) {
      res.clearCookie("idToken");
      res.redirect("/sign-in");
    }
  }
}

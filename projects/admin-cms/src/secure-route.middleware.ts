import { Injectable, NestMiddleware } from "@nestjs/common";
import { FirebaseService } from "./firebase/firebase.service";

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

      const { uid } = await this.auth.verifyIdToken(idToken);

      if (uid) {
        res.authenticated = true;
      } else {
        return res.redirect("/sign-in");
      }

      next();
    } catch (error) {
      res.redirect("/sign-in");
    }
  }
}

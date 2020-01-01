import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class UnsecureRenderMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.cookies.idToken) {
      return res.redirect("/");
    }

    next();
  }
}

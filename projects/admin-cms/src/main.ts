import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets("public", { prefix: "/" });
  app.setBaseViewsDir("views");
  app.setViewEngine("pug");

  await app.listen(3000);
}

bootstrap();

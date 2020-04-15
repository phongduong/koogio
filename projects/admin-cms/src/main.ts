import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.enableCors();
  app.useStaticAssets("public");
  app.setBaseViewsDir("views");
  app.setViewEngine("pug");

  await app.listen(process.env.PORT || 3000);
}

bootstrap();

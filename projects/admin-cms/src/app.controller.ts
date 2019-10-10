import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { title: "Homepage", message: 'Hello world!' };
  }
}

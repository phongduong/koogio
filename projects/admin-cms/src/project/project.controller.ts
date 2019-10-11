import { Controller, Get, Render } from '@nestjs/common';

@Controller('project')
export class ProjectController {
  @Get()
  @Render('new')
  root() {
    return { title: 'New project' };
  }
}

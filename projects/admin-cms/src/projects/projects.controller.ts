import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @Render("new")
  getProjects() {
    return { title: "New project" };
  }

  @Post()
  async createProject(@Body() body, @Res() res): Promise<any> {
    return res.status(HttpStatus.CREATED).send();
  }

  @Get("/:id")
  async getProjectById(@Param("id") id): Promise<any> {}

  @Put("/:id")
  async updateProject(@Param("id") id): Promise<any> {}

  @Delete("/:id")
  async deleteProject(@Param("id") id): Promise<any> {}
}

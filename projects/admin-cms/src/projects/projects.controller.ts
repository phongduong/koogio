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
import { IProject } from "./project.class";

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
    const data: IProject = body;

    try {
      await this.projectsService.create(data);

      return res.status(HttpStatus.CREATED).json({ data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  @Get("/:id")
  async getProjectById(@Param("id") id): Promise<any> {}

  @Put("/:id")
  async updateProject(@Param("id") id): Promise<any> {}

  @Delete("/:id")
  async deleteProject(@Param("id") id): Promise<any> {}
}

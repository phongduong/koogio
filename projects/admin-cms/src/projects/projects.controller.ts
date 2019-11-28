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
import { IProject } from "./project.interface";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(@Body() body: IProject, @Res() res): Promise<any> {
    try {
      await this.projectsService.create(body);

      return res.status(HttpStatus.CREATED).json({ data: body });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  @Get(":id")
  @Render("project")
  async getProjectById(@Param("id") id): Promise<any> {
    try {
      const data = await this.projectsService.get(id);

      return { title: data.title, data: { ...data, id } };
    } catch (error) {
      return { title: error.message };
    }
  }

  @Put(":id")
  async updateProject(
    @Param("id") id,
    @Body() body: IProject,
    @Res() res
  ): Promise<any> {
    try {
      await this.projectsService.update(id, body);

      return res.status(HttpStatus.OK).json({ data: body });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  @Delete(":id")
  async deleteProject(@Param("id") id, @Res() res): Promise<any> {
    try {
      await this.projectsService.delete(id);

      return res.status(HttpStatus.OK).json({ data: { deleted: true } });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}

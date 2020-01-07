import {
  Controller,
  Get,
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
import { ConfigService } from "../config/config.service";
import axios from "axios";

@Controller("projects")
export class ProjectsController {
  private GITHUB_ACCESS_TOKEN: string;

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly configService: ConfigService
  ) {
    this.GITHUB_ACCESS_TOKEN = configService.get("GITHUB_ACCESS_TOKEN");
  }

  @Post()
  async createProject(@Body() body: IProject, @Res() res): Promise<any> {
    try {
      await this.projectsService.create(body);
      await this.dispatchGithubWebhook();

      return res.status(HttpStatus.CREATED).json({ data: body });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  @Get()
  async listProjects(@Res() res): Promise<any> {
    try {
      const data = await this.projectsService.getAll();

      return res.status(HttpStatus.OK).json({ data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  @Get(":id")
  async getProjectById(@Param("id") id, @Res() res): Promise<any> {
    try {
      const data = await this.projectsService.get(id);

      return res.status(HttpStatus.OK).json({ data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
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
      await this.dispatchGithubWebhook();

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
      await this.dispatchGithubWebhook();

      return res.status(HttpStatus.OK).json({ data: { deleted: true } });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  async dispatchGithubWebhook() {
    await axios.post(
      "https://api.github.com/repos/phongduong/koogio/dispatches",
      { event_type: "Deploy ZEIT Now" },
      {
        headers: {
          Accept: "application/vnd.github.everest-preview+json",
          Authorization: `token ${this.GITHUB_ACCESS_TOKEN}`,
          "User-Agent": "phongduong"
        }
      }
    );
  }
}

import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  Param,
  Put,
  Delete
} from "@nestjs/common";

@Controller("projects")
export class ProjectsController {
  @Post()
  async createProject(@Body() body): Promise<any> {
    console.log(body);

    return Promise;
  }

  @Get("/new")
  @Render("new")
  getProjects() {
    return { title: "New project" };
  }

  @Get("/:id")
  async getProjectById(@Param("id") id): Promise<any> {}

  @Put("/:id")
  async updateProject(@Param("id") id): Promise<any> {}

  @Delete("/:id")
  async deleteProject(@Param("id") id): Promise<any> {}
}

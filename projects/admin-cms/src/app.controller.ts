import { Get, Controller, Render, Param } from "@nestjs/common";
import { ProjectsService } from "./projects/projects.service";

@Controller()
export class AppController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @Render("index")
  async root() {
    const title = "Homepage";

    try {
      const data = await this.projectsService.getAll();

      return { title, data, authenticated: true };
    } catch (error) {
      return { title: error.message };
    }
  }

  @Get("new")
  @Render("new")
  newProject() {
    return { title: "New project", authenticated: true };
  }

  @Get("detail/:id")
  @Render("project")
  async getProjectById(@Param("id") id): Promise<any> {
    try {
      const data = await this.projectsService.get(id);

      return { title: data.title, data: { ...data, id }, authenticated: true };
    } catch (error) {
      return { title: error.message };
    }
  }

  @Get("sign-in")
  @Render("sign-in")
  signIn() {
    return { title: "Sign in", authenticated: false };
  }
}

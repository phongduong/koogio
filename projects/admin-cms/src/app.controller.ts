import { Get, Controller, Render } from "@nestjs/common";
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

  @Get("sign-in")
  @Render("sign-in")
  signIn() {
    return { title: "Sign in", authenticated: false };
  }
}

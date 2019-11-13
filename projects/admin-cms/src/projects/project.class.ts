export interface IProject {
  title: string;
  description: string;
  googleLink: string;
  icon: string;
  screenshots: string[];
  formatId(): string;
}

export class Project implements IProject {
  title: string;
  description: string;
  googleLink: string;
  icon: string;
  screenshots: string[];

  constructor(project: Project) {
    this.title = project.title;
  }

  formatId(): string {
    return this.title
      .toLowerCase()
      .split(" ")
      .join("-");
  }
}

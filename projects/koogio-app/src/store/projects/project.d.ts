declare interface ProjectInterface {
  id: string;
  title: string;
  googleLink: string;
  description: string;
  icon: string;
  screenshots: string[];
  createTime: number;
}

declare interface StateInterface {
  projects: ProjectInterface[];
  project: ProjectInterface;
}

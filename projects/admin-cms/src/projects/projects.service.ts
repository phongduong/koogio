import { Injectable } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";
import { IProject, Project } from "./project.class";

@Injectable()
export class ProjectsService {
  private readonly firestore;

  constructor(private readonly firebaseService: FirebaseService) {
    this.firestore = firebaseService.getFirestore();
  }

  async create(project: IProject): Promise<any> {
    const newProject = new Project(project);

    return await this.firestore
      .collection("projects")
      .doc(newProject.formatId())
      .set(project);
  }

  async get(id: string): Promise<any> {}

  async getAll(): Promise<any[]> {
    return [];
  }

  async update(id: string, project: IProject): Promise<any> {}

  async delete(id: string): Promise<any> {}
}

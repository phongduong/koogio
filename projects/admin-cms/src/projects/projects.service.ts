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

  async get(id: string): Promise<any> {
    return await this.firestore
      .collection("projects")
      .doc(id)
      .get()
      .then(snapshot => snapshot.data());
  }

  async getAll(): Promise<any[]> {
    return await this.firestore
      .collection("projects")
      .listDocuments()
      .then(projectRefs => this.firestore.getAll(...projectRefs))
      .then(projectSnapshots =>
        projectSnapshots
          .map(snapshot => {
            return {
              ...snapshot.data(),
              id: snapshot.id,
              createTime: snapshot.createTime.seconds
            };
          })
          .sort((projectA, projectB) => projectB - projectA)
      );
  }

  async update(id: string, project: IProject): Promise<any> {
    console.log(id, project);
  }

  async delete(id: string): Promise<any> {}
}

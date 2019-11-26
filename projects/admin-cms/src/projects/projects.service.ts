import { Injectable } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";
import { IProject } from "./project.interface";

@Injectable()
export class ProjectsService {
  private readonly firestore;

  constructor(private readonly firebaseService: FirebaseService) {
    this.firestore = firebaseService.getFirestore();
  }

  async create(project: IProject): Promise<any> {
    return await this.firestore.collection("projects").add(project);
  }

  async get(id: string): Promise<any> {
    return await this.firestore
      .collection("projects")
      .doc(id)
      .get()
      .then(snapshot => snapshot.data());
  }

  async getAll(): Promise<any[]> {
    const documents = await this.firestore
      .collection("projects")
      .listDocuments();

    return documents.length !== 0
      ? this.firestore.getAll(...documents).then(projectSnapshots =>
          projectSnapshots
            .map(snapshot => {
              return {
                ...snapshot.data(),
                id: snapshot.id,
                createTime: snapshot.createTime.seconds
              };
            })
            .sort((projectA, projectB) => projectB - projectA)
        )
      : [];
  }

  async update(id: string, project: IProject): Promise<any> {
    return await this.firestore
      .collection("projects")
      .doc(id)
      .set(project, { merge: true });
  }

  async delete(id: string): Promise<any> {
    return await this.firestore
      .collection("projects")
      .doc(id)
      .delete();
  }
}

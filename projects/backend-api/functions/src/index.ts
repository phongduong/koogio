import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
admin.initializeApp();

exports.createProject = functions.https.onRequest(async (req, res) => {
  const project = await admin
    .firestore()
    .collection("projects")
    .add(req.body);

  res.json({ project });
});

exports.listProjects = functions.https.onRequest(async (_, res) => {
  const documents = await admin
    .firestore()
    .collection("projects")
    .listDocuments();
  const projects: any[] =
    documents.length !== 0
      ? await admin
          .firestore()
          .getAll(...documents)
          .then(projectSnapshots =>
            projectSnapshots
              .map((snapshot: DocumentSnapshot | any) => {
                return {
                  ...snapshot.data(),
                  id: snapshot.id,
                  createTime: snapshot.createTime.seconds
                };
              })
              .sort((projectA, projectB) => projectB - projectA)
          )
      : [];

  res.json({ projects });
});

exports.getProjectById = functions.https.onRequest(async (req, res) => {
  const id = req.params.id;
  const project = admin
    .firestore()
    .collection("projects")
    .doc(id)
    .get()
    .then(snapshot => snapshot.data());

  res.json({ project });
});

exports.updateProject = functions.https.onRequest(async (req, res) => {
  const {
    params: { id },
    body
  } = req;
  const project = await admin
    .firestore()
    .collection("projects")
    .doc(id)
    .set(body, { merge: true });

  res.json({ project });
});

exports.deleteProject = functions.https.onRequest(async (req, res) => {
  await admin
    .firestore()
    .collection("projects")
    .doc(req.params.id)
    .delete();

  res.json({ deleted: true });
});

import { mutations } from "./mutations";
import { TodoItem } from "@/store/todos/types";
import { RootState } from "./../types";
import { ActionTree, Payload } from "vuex";
import { TodosState } from "./index";
import { db } from "../../auth/email";
import firebase from "firebase/app";

export const actions: ActionTree<TodosState, RootState> = {
  async setTodo({ commit }, payload: string) {
    console.log(payload);
    const querySnapshot = await db
      .collection("todos")
      .where("userID", "==", payload)
      .get();
    const items = [] as TodoItem[];

    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    commit("SET_TODOS", items);
  },

  async addTodo({ commit }, payload: TodoItem) {
    commit("ADD_TODO", payload);
    const user = firebase.auth().currentUser;
    const id = user?.uid;
    payload.userID = id;
    db.collection("todos")
      .doc(payload.id)
      .set(payload)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error: any) => {
        console.error("Error writing document: ", error);
      });
  },
  async changeTodoStatus({ commit }, payload: TodoItem) {
    commit("COMPLETE_TODO", payload);
    // (await getDB()).put("todo", payload, payload.id)
    const todoRef = db.collection("todos").doc(payload.id);
    return todoRef.update({
      done: true,
    });
  },
  async addImportantStatus({ commit }, payload: TodoItem) {
    commit("ADD_IMPORTANT", payload);
    const todoRef = db.collection("todos").doc(payload.id);
    return todoRef.update({
      important: true,
    });
  },
  async deleteTodo({ commit }, payload: string) {
    commit("DELETE_TODO", payload);
    // (await getDB()).delete("todo", payload)
  },
  async addFile(
    { commit },
    payload: { id: string; file: File; fileUrl: string }
  ) {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(payload.file.name);

    try {
      await fileRef.put(payload.file).then();
      const url = await storageRef
        .child(payload.file.name)
        .getDownloadURL()
        .then();
      payload.fileUrl = url;
      const todoRef = db.collection("todos").doc(payload.id);
      todoRef.update({
        attachments: firebase.firestore.FieldValue.arrayUnion({
          name: payload.file.name,
          size: payload.file.size,
          type: payload.file.type,
          url,
        }),
      });
      commit("ADD_FILE", payload);
      return;
    } catch (e) {
      // TODO: !!!!!!!!!!!!
    }

  },
};

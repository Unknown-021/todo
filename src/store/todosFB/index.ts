import { actions } from './actions';
import { getters } from './getters';
import { mutations } from "./mutations";
import { todosFB } from './index';
import { rootState } from "@/store/";
import { Module } from "vuex"; 
import { TodoItem } from "@/store/todos/types";
import { db } from '../../auth/email'



type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;



db.collection("todos").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
  });
});


function getTodos(): any {
  db.collection("todos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
  });
}

const getAll = async () => {
  const output = await
  db.collection("todos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});
return output;
}



const state = async () => {
  return {
    // todosFB: await (await getDB()).getAll('todo') as TodoItem[]
    // todosFB: await (await db.collection("todos").get()) as TodoItem[]
    // todosFB: await (await getTodos()) as TodoItem[]
    todosFB: [] as TodoItem[] | null,
  }
};

const namespaced = true;

export const todosFB: () => Promise<Module<TodosState, ReturnType<typeof rootState>>> = async () => ({
  state: (await state()),
  mutations,
  getters,
  actions,
});

export type TodosState = Await<ReturnType<typeof state>>;

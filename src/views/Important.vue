<template>
  <div class="completed">
    <h1 class="completed-h1">Your important tasks</h1>
    <br>
    <br>
    <v-card
      v-for="todo in important"
      :key="todo.id"
      :item="todo"
      class="todo-list_item"
      elevation="2"
      outlined
    >
      <div>
        <input 
        class="checkbox-round"
          type="checkbox"
          id="checkbox"
          checked
        />
        <label for="checkbox"></label>
      </div>
      <router-link
        class="todo-list_item-title done"
        :to="{ name: 'Todo', params: { id: todo.id }}"
      >
      {{ todo.todoTitle }}
      </router-link>
      <div>
        <input 
          class="star" 
          type="checkbox" 
          :checked="!todo.important"
          @click="addImportantStatus(todo)"
        >
        <br/><br/>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { TodoItem, IBaseFile } from "../store/todos/types";

@Component
export default class Completed extends Vue {

  get important(): TodoItem[] {
    return this.$store.getters.showImportantTodo;
  }
  public addImportantStatus(todoItem: TodoItem) {
     this.$store.dispatch("addImportantStatus", todoItem);
  }
}
</script>

<style>
.completed{
  display: flex;
  flex-direction: column;
  width: 650px;
  margin: 0 auto;
  margin-top: 50px;
}
.completed-todo{
  text-decoration: line-through;
}
.completed-h1{
  font-weight: 300;
  text-align: center;
}

.todo-list_item:first-child{
  border-top-left-radius: 20px!important;
  border-top-right-radius: 20px!important;
}
.todo-list_item:last-child{
  border-bottom-left-radius: 20px!important;
  border-bottom-right-radius: 20px!important;
}
.todo-list_item{
  background-color: #f8f8fa!important;
  padding: 20px;
  display: flex!important;
}
.todo-list_item-title{
  margin-top: 4px;
  margin-left: 10px;
  color:#4d4e58!important;
}
</style>
<template>
  <div>
     <transition-group name="list" tag="p">
    <v-card
      v-for="todo in undone"
      :key="todo.id"
      :item="todo"
      class="todo-list_item"
      elevation="2"
      outlined
    >
      <v-checkbox
        @click="changeTodoStatus(todo)"
        class="todo-list_item-check"
        color="success"
        hide-details
      >
      </v-checkbox>

      <router-link
        class="todo-list_item-title"
        :to="{ name: 'Todo', params: { id: todo.id }}"
      >
      {{ todo.todoTitle }}
      </router-link>

    </v-card>
    </transition-group> 

      <router-link to="/" class="add-new-item-link">
        <v-btn
          color="pink"
          dark
          fab
        >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      </router-link>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TodoItemC from "./TodoItemC.vue";
import { TodoItem, IBaseFile } from "../store/todos/types";
import { v4 as uuidv4 } from "uuid";

@Component({
  components: {
    TodoItemC
  }
})
export default class TodoList extends Vue {
  fileInput: File | null = null;

  // get todos(): TodoItem[] {
  //   return this.$store.state.todos.todos;
  // }
  get undone(): TodoItem[] {
    return this.$store.getters.showUndoneTodo;
  }
  public changeTodoStatus(todoItem: TodoItem): void {
    this.$store.commit("COMPLETE_TODO", todoItem);
    // this.$store.commit("DELETE_TODO", todoItem);
  }
}
</script>

<style>
.card-top {
  display: flex;
  margin-left: 10px;
}
.text-area {
  margin: 10px;
}
.attachments-label {
  margin-left: 10px;
}
hr {
  margin: 10px;
}
.v-btn--fab.v-size--default.v-btn--absolute.v-btn--bottom {
    bottom: 52px!important;
}
.add-new-item-link{
  position: absolute;
  bottom: 58px;
  right: 10px;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(0px);
}
</style>

<template>
  <div class="completed">
    <h1><i>Your compelted tasks:</i></h1>
    <br>
    <br>
    <ol>
      <li
        class="completed-todo"
        v-for="todo in done"
        :key="todo.id"
      >
      {{ todo.todoTitle }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { TodoItem, IBaseFile } from "../store/todos/types";

@Component
export default class Completed extends Vue {

  get done(): TodoItem[] {
    return this.$store.getters.showDoneTodo;
  }
}
</script>

<style>
.completed{
  margin: 45px;
  width: 550px;
  margin: 100px auto;
}
.completed-todo{
  text-decoration: line-through;
}
</style>
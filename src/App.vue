<template>
  <v-app>
    <v-main>
      <div class="container">
        <div class="todo-title-input">
          <v-text-field
            v-model="newTodo.todoTitle"
            label="Enter Task"
            hide-details="auto"
          ></v-text-field>
        </div>
        <div class="todo-add-btn">
          <v-btn 
            @click.prevent="addTodo"
            block>
            Add Task
          </v-btn>
        </div>
        
      {{ version }}
      </div>
        
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { TodoItem } from "./store/todos/types";


@Component
export default class App extends Vue {
  private newTodo: TodoItem;

  constructor() {
    super();
    this.newTodo = {
      todoTitle: '',
      done: false
    };
  }

  get version() {
    return this.$store.state.version;
  }

  public addTodo(newTodo: string): void {
    this.$store.commit("ADD_TODO", this.newTodo);
    this.newTodo.todoTitle = '';
    
  }



}

</script>

<style>
.container{
  display: flex;
  flex-direction: column;
  width: 550px;
  margin: 0 auto;
}
.todo-title-input{
  margin-top: 50px;
}
.todo-add-btn{
  margin-top: 15px;
}
</style>
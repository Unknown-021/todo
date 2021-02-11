<template>
  <div class="todo-list-container">
    <div class="tasks">
      Todo List
    </div>
     <transition-group name="list" tag="p">
    <v-card
      
      v-for="todo in undone"
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
          @click="changeTodoStatus(todo)"
        />
        <label for="checkbox"></label>
      </div>
      <router-link
        class="todo-list_item-title"
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
    </transition-group> 
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TodoItemC from "./TodoItemC.vue";
import { TodoItem, IBaseFile } from "../store/todos/types";

@Component({
  components: {
    TodoItemC
  }
})
export default class TodoList extends Vue {
  fileInput: File | null = null;
  

  get undone(): TodoItem[] {
    return this.$store.getters.showUndoneTodo;
  }

  public changeTodoStatus(todoItem: TodoItem) {
    this.$store.dispatch("changeTodoStatus", todoItem);
  }
  public addImportantStatus(todoItem: TodoItem) {
    this.$store.dispatch("addImportantStatus", todoItem);
  }
}
</script>

<style>
.todo-list-container{
  display: flex;
  flex-direction: column;
  width: 650px;
  margin: 0 auto;
  margin-top: 90px;
}
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
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.todo-list_item .list-enter-active, .list-leave-active {
  transition: all 1s;
  background-color: #4d4e58;
  
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(0px);
  background-color: black;
  
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
  text-decoration: none!important;
  flex-grow: 1;
}

.checkbox-round {
  width: 2em;
  height: 2em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #ddd;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}
.checkbox-round::before{
  position: relative;
  content: "\2713";
  font-size: 28px;
  bottom: 5px;
  left: 4px;
  color: white;
}

.checkbox-round:checked {
  background-color: #66bb6a;
}
.tasks{
  align-self: center;
  font-size: 2rem;
  color: #4d4e58;
  margin-bottom: 50px;
  font-weight: 300;
}
.leave{
  background-color: black;
}
.star {
    visibility:hidden;
    font-size:30px;
    cursor:pointer;
}
.star:before {
   content: "\2605";
   position: absolute;
   visibility:visible;
}
.star:checked:before {
   content: "\2606";
   position: absolute;
}
</style>

<template>
  <div class="app-container">
      <h1 class="home-h1">Welcome!</h1>
      <h2>You can start with your first todo here:</h2>
      <v-form @submit.prevent="addTodo(newTodo.todoTitle)">
        <div class="todo-title-input">
          <v-text-field
            v-model="newTodo.todoTitle"
            placeholder="What needs to be done?"
            solo
          ></v-text-field>
        </div>
      </v-form>
      <v-snackbar
            v-model="snackbar.status"
            :timeout="2000"
          >  
            <span>{{snackbar.text}}</span>
            <v-btn 
              text
              @click="snackbar.status = false"
            >
            Close</v-btn>
          </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import TodoList from '../components/TodoList.vue'
import { TodoItem} from "../store/todos/types";
@Component({
  components: {
    TodoList,
  }
})
export default class Home extends Vue {
    public snackbar = {
      status: false,
      text: '',
      timeout: 1000,
  };
    private newTodo: TodoItem = {
      todoTitle: '',
      done: false,
      attachments: []
    };
    public resetTodo(): void {
        this.newTodo = {
        todoTitle: '',
        done: false,
        attachments: []
        }
    }
    public async addTodo() {
      this.snackbar.status = true;
      this.snackbar.text = this.newTodo.todoTitle;
      await this.$store.dispatch("addTodo", this.newTodo);
      this.resetTodo();
    }
}
</script>

<style>
.home-h1{
  font-weight: 900;
}
h1, h2{
  color: #4d4e58;
  font-weight: 900;
}
.todo-title-input{
  margin-top: 20px;
}

</style>
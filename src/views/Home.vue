<template>
  <div class="app-container">
      <h1>Welcome!</h1>
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
    private newTodo: TodoItem = {
          // id: uuidv4(),
          todoTitle: '',
          done: false,
          attachments: []
    };
    public resetTodo(): void {
        this.newTodo = {
        // id: uuidv4(),
        todoTitle: '',
        done: false,
        attachments: []
        }
    }
    public async addTodo() {
      await this.$store.dispatch("addTodo", this.newTodo);
      this.resetTodo();
    }
}
</script>

<style>

h1, h2{
  color: #4d4e58;
  font-weight: 900;
}
.todo-title-input{
  margin-top: 20px;
}

</style>
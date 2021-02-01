<template>
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
          @click.prevent="addTodo(newTodo.todoTitle)"
          block>
          Add Task
        </v-btn>
    </div>

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
    public addTodo(value: string): void {
      if(value){
        this.$store.commit("ADD_TODO", this.newTodo);
        this.resetTodo();
      }
    }
}
</script>
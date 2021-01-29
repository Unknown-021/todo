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
                  @click.prevent="addTodo(newTodo.todoTitle)"
                  block>
                  Add Task
                </v-btn>
            </div>
            <todo-list>
            </todo-list>
          </div>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import TodoList from './components/TodoList.vue'
import { TodoItem} from "./store/todos/types";

@Component({
  components: {
    TodoList,
  }
})

export default class App extends Vue {
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
.todo-card{
  margin-top: 10px;
}
.v-card{
  /* display: flex; */
  margin-top: 15px;
}
.task-title{
  padding-top: 20px;
}
li{
  list-style: none;
}
.attached-img{
  width: 100px;
}
</style>
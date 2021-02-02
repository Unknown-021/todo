<template>
  <div class="todo-item">
    <h1>{{this.upperCase(currentTodo.todoTitle)}}</h1>
    <div class="todo-card">
    <v-card>
      <div class="card-top">
        <v-checkbox @click="changeTodoStatus"></v-checkbox>
        <p class="task-title">{{ currentTodo.todoTitle }}</p>
      </div>
      <div class="text-area">
        <v-textarea 
          v-model="currentTodo.description"
          solo name="input-7-4" 
          label="Description"
        >
        </v-textarea>
      </div>
      <p class="attachments-label">Attachments:</p>
      <ul>
        <li v-for="att in currentTodo.attachments" :key="att.id">
          <div v-if="att.type.includes('image')">
            <img class="attached-img" :src="att.url" alt="" />
          </div>
          <div v-if="att.type.includes('audio')">
            <audio controls>
              <source :src="att.url" type="audio/mp3" />
            </audio>
          </div>
          <div v-if="att.type.includes('video')">
            <video width="320" height="240" controls>
              <source :src="att.url" type="video/mp4" />
            </video>
          </div>
        </li>
      </ul>
      <hr />
      <br />
      <div class="file-input">
        <v-file-input
          @change="handleFile"
          ref="file"
          small-chips
          type="file"
          accept="video/*, image/*, audio/*"
          label="File input"
        >
        </v-file-input>
      </div>
    </v-card>
  </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from 'vue-property-decorator';
import TodoItemC from "../components/TodoItemC.vue";
import { TodoItem, IBaseFile } from "../store/todos/types";
import { fileParse } from "../helpers/fileParse";
import { v4 as uuidv4 } from "uuid";
import { Route } from 'vue-router';


@Component({
  components: {
    TodoItemC
  },
})
export default class TodoDetailed extends Vue {
  @Prop ({required:true}) id!: string
  
  fileInput: File | null = null;


  get currentTodo(): TodoItem {
      return this.$store.getters.getCurrentTodo(this.id);
  }
  public handleFile(file: File): void {
    console.log(file);
    this.addFile(fileParse(file));
  }
  public upperCase(value: string): string {
    const newValue = value.toUpperCase();
    return newValue;
  }

  public addFile(file: IBaseFile): void {
    // console.log(this.newTodo.id);
    this.$store.commit("ADD_FILE", { id: this.currentTodo.id, file: file });
  }

  public changeTodoStatus(): void {
    this.$router.push({name:"Home"});
    this.$store.commit("CHANGE_TODO_STATUS", this.currentTodo.id);
  }


}
</script>

<style>
.todo-item{
  margin: 45px;
  width: 550px;
  margin: 100px auto;
}
</style>

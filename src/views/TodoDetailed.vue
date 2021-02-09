<template>
  <div class="todo-item">
    <div class="todo-card">
    <v-card>
      <div class="card-top">
        <div>
          <input 
          class="checkbox-round"
            type="checkbox"
            id="checkbox"
            @click="changeTodoStatus(todo)"
          />
          <label for="checkbox"></label>
        </div>
        <p class="task-title">{{ currentTodo.todoTitle }}</p>
      </div>
      <div class="text-area">
        <v-textarea
          class="elevation-0"
          v-model="currentTodo.description"
          solo name="input-7-4" 
          label="Description"
        >
        </v-textarea>
      </div>

      <div class="file-input">
        <v-file-input
          class="file-input"
          @change="handleFile"
          hide-input
          ref="file"
          type="file"
          accept="video/*, image/*, audio/*"
          label="Add file"
        >
        </v-file-input>
        <p class="input-title">Add file</p>
      </div>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item,i) in 1"
          :key="i"
        >
          <v-expansion-panel-header>
            Attachments
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul class="attachment-list">
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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
  public loadingStatus(): boolean {
    return this.$store.getters.getLoadingStatus();
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
.v-card{
  background-color: #f8f8fa!important;
  padding: 20px!important;

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
.task-title{
      margin-left: 18px;
    margin-top: 4px;
}
.file-input{
  width: 100%;
  height: 70px;
}
.input-title{
    position: relative;
    bottom: 52px;
    left: 27px;
}
.attachment-list li{
  list-style-type: none;
}
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>

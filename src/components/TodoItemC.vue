<template>
    <div class="todo-card">
        <v-card>
            <div class="card-top">
                <v-checkbox
                    @click="changeTodoStatus"
                ></v-checkbox>
                <p class="task-title">{{ item.todoTitle }}</p>
            </div>
            <div class="text-area">
                <v-textarea
                    solo
                    name="input-7-4"
                    label="Text here">
                </v-textarea>
            </div>
        <p class="attachments-label">Attachments:</p>
            <ul>
                <li
                v-for="att in item.attachments"
                :key="att.id">
                <div v-if="att.type.includes('image')">
                    <img class="attached-img" :src="att.url" alt="">
                </div>
                <div v-if="att.type.includes('audio')">
                    <audio controls>
                    <source :src="att.url" type="audio/mp3">
                </audio>
                </div>
                <div v-if="att.type.includes('video')">
                    <video width="320" height="240" controls>
                    <source :src="att.url" type="video/mp4">
                    </video>
                </div>
                </li>
            </ul>
            <hr>
            <br>
            <div class="file-input">
                <v-file-input
                @change="handleFile"
                ref="file"
                small-chips
                type="file"
                accept="video/*, image/*, audio/*"
                label="File input">
                </v-file-input>
            </div>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { TodoItem,  IBaseFile} from "../store/todos/types";
import { fileParse } from "../helpers/fileParse"


@Component
export default class TodoItemC extends Vue{
@Prop() item!: TodoItem

    public handleFile(file: File): void {
        console.log(file);
        this.addFile(fileParse(file));
    }

    public addFile(file: IBaseFile): void {
        // console.log(this.newTodo.id);
        this.$store.commit("ADD_FILE", {id: this.item.id , file: file});
    }

    public changeTodoStatus(): void {
        this.$store.commit("CHANGE_TODO_STATUS", this.item.id);
        this.$store.commit("DELETE_TODO", this.item.id);
    }

}
</script>

<style>

</style>
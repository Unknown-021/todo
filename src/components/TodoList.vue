<template>
    <div>
        <todo-item-c v-for="todo in todos" :key="todo.id" :item="todo"></todo-item-c>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import TodoItemC from './TodoItemC.vue'
import { TodoItem,  IBaseFile} from "../store/todos/types";
import { v4 as uuidv4 } from "uuid";

@Component({
    components: {
        TodoItemC
    }
})
export default class TodoList extends Vue{

    fileInput: File|null = null


    get todos(): TodoItem[] {
        return this.$store.state.todos.todos;
    }

}

</script>

<style >
.card-top{
    display: flex;
    margin-left: 10px;
}
.text-area{
    margin: 10px;
}
.attachments-label{
    margin-left: 10px;
}
hr{
    margin: 10px;
}
</style>
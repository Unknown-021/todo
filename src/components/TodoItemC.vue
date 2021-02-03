<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { TodoItem, IBaseFile } from "../store/todos/types";
import { fileParse } from "../helpers/fileParse";

@Component
export default class TodoItemC extends Vue {
  @Prop() item!: TodoItem;

  public handleFile(file: File): void {
    console.log(file);
    this.addFile(fileParse(file));
  }

  public addFile(file: IBaseFile): void {
    // console.log(this.newTodo.id);
    this.$store.commit("ADD_FILE", { id: this.item.id, file: file });
  }

  public changeTodoStatus(): void {
    this.$store.commit("CHANGE_TODO_STATUS", this.item.id);
    this.$store.commit("DELETE_TODO", this.item.id);
  }
}
</script>

<style></style>

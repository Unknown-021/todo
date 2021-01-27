export interface TodoItem {
  todoTitle: string,
  done: boolean
}

export interface TodoList {
  [index: number]: TodoItem;
}


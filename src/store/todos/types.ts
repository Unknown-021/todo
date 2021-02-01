export interface IBaseFile {
  size: number;
  name: string;
  type: string;
  url: string;
}

export interface TodoItem {
  id?: string;
  todoTitle: string;
  descrption?: string;
  done: boolean;
  attachments: IBaseFile[];
}

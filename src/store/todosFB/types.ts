export interface IBaseFile {
  size: number;
  name: string;
  type: string;
  url: string;
}

export interface TodoItem {
  description: string;
  id?: string;
  userID?: string;
  todoTitle: string;
  descrption?: string;
  done: boolean;
  important?: boolean;
  attachments: IBaseFile[];
}

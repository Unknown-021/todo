import { IBaseFile } from "../store/todos/types";

export function fileParse(file: File): IBaseFile {
  const fileUrl = URL.createObjectURL(file);
  const parsedFile: IBaseFile = {
    size: file.size,
    name: file.name,
    type: file.type,
    url: fileUrl
  };
  return parsedFile;
}

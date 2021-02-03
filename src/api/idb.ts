import { TodoItem } from '@/store/todos/types';
import { IBaseFile } from '@/store/todos/types';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MyDB extends DBSchema {
    'todo': {
    key: string;
    value: TodoItem;
  };
}

let db: IDBPDatabase<MyDB>|null = null;

export async function getDB() {
  if (!db) {
    db = await openDB<MyDB>('todoDB', 1, {
      upgrade(db) {
        db.createObjectStore('todo');
      },
    });
  }
  return db

}



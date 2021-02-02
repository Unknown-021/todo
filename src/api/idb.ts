import { TodoItem } from '@/store/todos/types';
import { IBaseFile } from '@/store/todos/types';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

// interface MyDB extends DBSchema {
//   'todo': {
//     key: string;
//     value: {
//       id: string;
//       todoTitle: string;
//       descrption?: string;
//       done: boolean;
//       attachments?: {
//         size: number;
//         name: string;
//         type: string;
//         url: string;
//       };
//     };
//   };
//   products: {
//     value: {
//       name: string;
//       price: number;
//       productCode: string;
//     };
//     key: string;
//     indexes: { 'by-price': number };
//   };
// }

// // async function demo() {
// //   const db = await openDB<MyDB>('my-db', 1, {
// //     upgrade(db) {
// //       db.createObjectStore('todo');
// //     },
// //   });

// //   // This works
// //   await db.put('todo', {id: 'lol', todoTitle: '123', done: false}, 'todo-id');
// // }

// const checkStorage = async storeName => {
//   try {
//     const db = await dbPromise()
//     const tx = db.transaction(storeName, 'readonly')
//     const store = tx.objectStore(storeName)

//     return store.get(storeName)
//   } catch (error) {
//     return error
//   }
// }

// export default {
//   checkStorage,
// };

interface MyDB extends DBSchema {
  // 'todo': {
  //   key: string;
  //   value: {
  //     id: string;
  //     todoTitle: string;
  //     description?: string;
  //     done: boolean;
  //     attachments?: IBaseFile;
  //   };
  // };
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



import { openDB } from 'idb';
import { stringify } from 'uuid';

export async function demo5(): Promise<string|undefined> {

  const db2 = await openDB('firebaseLocalStorageDb', 1);

  return db2.getAll('firebaseLocalStorage').then((result) => result[0].value.uid);
}

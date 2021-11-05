import {
  Item, cloneItem, BooleanNumber, JSONRepresentationType, getItemFromObject, StorageMin,
} from '../types/item';

const DB_NAME = 'shopping-list-app-db';
const DB_VERSION = 3;
const DB_SHOPPING_LIST_STORE_NAME = 'shopping-list-store';

type ItemWithID = Item & { id: number };
type JSONExportType = {
  items: Item[],
  name: string,
  message: string,
};

export class ShoppingDatabase {
  private db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  getAllItems(maxCount = -1): Promise<Item[]> {
    return new Promise<Item[]>((resolve, reject) => {
      const objectStore = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME)
        .objectStore(DB_SHOPPING_LIST_STORE_NAME);
      const getReq = objectStore.getAll(null, maxCount > 0 ? maxCount : undefined);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      getReq.onerror = (event: Event) => {
        console.debug('getAllItems getAll() failed');
        reject(new Error(`${DB_SHOPPING_LIST_STORE_NAME} getAll: errCode = ${getReq.error}`));
      };

      // eslint-disable-next-line no-unused-vars
      getReq.onsuccess = function onsuccess(this: IDBRequest<unknown[]>) {
        console.debug('getAllItems: getAll() succeeded.');
        resolve(this.result as Item[]);
      };
    });
  }

  getItemsWithDate(date: Date, keyRangeOnly = IDBKeyRange.only,
    transaction?: IDBTransaction): Promise<Item[]> {
    return new Promise<Item[]>((resolve, reject) => {
      const objectStore = (transaction || this.db.transaction(DB_SHOPPING_LIST_STORE_NAME))
        .objectStore(DB_SHOPPING_LIST_STORE_NAME);
      const getReq = objectStore.index('date').getAll(keyRangeOnly(date));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      getReq.onerror = (event: Event) => {
        console.debug('getItemsWithDate .index("date").getAll() failed');
        reject(new Error(`${DB_SHOPPING_LIST_STORE_NAME} index("date").getAll: errCode = ${getReq.error}`));
      };

      // eslint-disable-next-line no-unused-vars
      getReq.onsuccess = function onsuccess(this: IDBRequest<unknown[]>) {
        console.debug('getItemsWithDate .index("date").getAll() succeeded');
        resolve(this.result as Item[]);
      };
    });
  }

  getItemsSaved(saved: BooleanNumber, keyRangeOnly = IDBKeyRange.only,
    transaction?: IDBTransaction): Promise<Item[]> {
    return new Promise<Item[]>((resolve, reject) => {
      const objectStore = (transaction || this.db.transaction(DB_SHOPPING_LIST_STORE_NAME))
        .objectStore(DB_SHOPPING_LIST_STORE_NAME);
      const getReq = objectStore.index('saved').getAll(keyRangeOnly(saved));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      getReq.onerror = (event: Event) => {
        console.debug('getItemsSaved .index("date").getAll() failed');
        reject(new Error(`${DB_SHOPPING_LIST_STORE_NAME} index("date").getAll: errCode${getReq.error}`));
      };

      // eslint-disable-next-line no-unused-vars
      getReq.onsuccess = function onsuccess(this: IDBRequest<unknown[]>) {
        console.debug('getItemsSaved .index("date").getAll() succeeded');
        resolve(this.result as Item[]);
      };
    });
  }

  deleteItem(item: Item, keyRangeOnly = IDBKeyRange.only): Promise<undefined> {
    const transaction = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(DB_SHOPPING_LIST_STORE_NAME);
    return this.getItemsWithDate(item.date, keyRangeOnly, transaction)
      .then((items) => new Promise<undefined>((resolve, reject) => {
        console.debug('deleteItem: getItemsWithDate succeeded');
        let found = false;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const onerror = (event: Event) => {
          console.debug('deleteItem add/update failed');
          reject(new Error(`${DB_SHOPPING_LIST_STORE_NAME} add/update failed`));
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const onsuccess = function onsuccess(this: IDBRequest<undefined>) {
          console.debug('deleteItem: add/update succeeded.');
          resolve(undefined);
        };

        (items as ItemWithID[]).forEach((matchItem: ItemWithID) => {
          if (!found && matchItem.name === item.name && matchItem.saved === item.saved) {
            console.debug('deleteItem: found a matching item, deleting it...');
            const setReq = objectStore.delete(keyRangeOnly(matchItem.id));
            setReq.onerror = onerror;
            setReq.onsuccess = onsuccess;
            found = true;
          }
        });

        if (!found) {
          console.debug('warning: deleteItem no matching entry.');
          resolve(undefined);
        }
      })).catch((reason) => {
        console.debug('deleteItem: getItemsWithDate() failed');
        return Promise.reject(new Error(`${DB_SHOPPING_LIST_STORE_NAME} getItemsWithDate: reason ${reason}`));
      });
  }

  clearAll(): Promise<undefined> {
    return new Promise<undefined>((resolve, reject) => {
      const request = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, 'readwrite')
        .objectStore(DB_SHOPPING_LIST_STORE_NAME).clear();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      request.onerror = (event: Event) => {
        console.debug('clearAll: clear() failed');
        reject(new Error(`${DB_SHOPPING_LIST_STORE_NAME} clear: errCode${request.error}`));
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      request.onsuccess = function onsuccess(this: IDBRequest<undefined>) {
        console.debug('clearAll: clear() succeeded');
        resolve(this.result);
      };
    });
  }

  clearUnsaved(keyRangeOnly = IDBKeyRange.only): Promise<undefined> {
    const transaction = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(DB_SHOPPING_LIST_STORE_NAME);
    return new Promise<undefined>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      transaction.onerror = (event: Event) => {
        console.debug('clearUnsaved: clear() failed');
        reject(new Error(`${DB_SHOPPING_LIST_STORE_NAME} clear: errCode${transaction.error}`));
      };

      transaction.oncomplete = () => {
        console.debug('clearUnsaved: clear() succeeded');
        resolve(undefined);
      };

      this.getItemsSaved(0, keyRangeOnly, transaction).then((items: unknown) => {
        (items as ItemWithID[]).forEach((clearItem: ItemWithID) => {
          objectStore.delete(keyRangeOnly(clearItem.id));
        });
      }); // catch is not necessary, it will reject in transaction.onerror().
    });
  }

  // eslint-disable-next-line no-undef
  addUpdateItem(item: Item, keyRangeOnly = IDBKeyRange.only): Promise<IDBValidKey> {
    const transaction = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(DB_SHOPPING_LIST_STORE_NAME);
    return this.getItemsWithDate(item.date, keyRangeOnly, transaction)
      // eslint-disable-next-line no-undef
      .then((items: unknown) => new Promise<IDBValidKey>((resolve, reject) => {
        console.debug('addUpdateItem: getItemsWithDate succeeded');
        let found = false;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const onerror = (event: Event) => {
          console.debug('addUpdateItem add/update failed');
          reject(new Error(`${DB_SHOPPING_LIST_STORE_NAME} add/update failed`));
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, no-undef
        const onsuccess = function onsuccess(this: IDBRequest<IDBValidKey>) {
          console.debug('addUpdateItem: add/update succeeded.');
          resolve(this.result);
        };

        (items as ItemWithID[]).forEach((prevItem: ItemWithID) => {
          if (!found && prevItem.name === item.name) {
            console.debug('addUpdateItem: found a matching item, updating it...');
            const itemClone = { ...item, id: 0 };
            itemClone.id = prevItem.id;
            const setReq = objectStore.put(itemClone);
            setReq.onerror = onerror;
            setReq.onsuccess = onsuccess;
            found = true;
          }
        });

        if (!found) {
          console.debug('addUpdateItem no matching entry yet');
          const setReq = objectStore.add(item);
          setReq.onerror = onerror;
          setReq.onsuccess = onsuccess;
        }
      })).catch((reason) => {
        console.debug('addUpdateItem: getItemsWithDate() failed');
        return Promise.reject(new Error(`${DB_SHOPPING_LIST_STORE_NAME} getItemsWithDate: reason ${reason}`));
      });
  }

  saveUnsaved(date: Date, keyRangeOnly = IDBKeyRange.only): Promise<undefined> {
    const transaction = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(DB_SHOPPING_LIST_STORE_NAME);
    return new Promise<undefined>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      transaction.onerror = (event: Event) => {
        console.debug('saveUnsaved: transaction failed');
        reject(new Error(`${DB_SHOPPING_LIST_STORE_NAME} transaction: errCode${transaction.error}`));
      };

      transaction.oncomplete = () => {
        console.debug('saveUnsaved: transaction succeeded');
        resolve(undefined);
      };

      this.getItemsSaved(0, keyRangeOnly, transaction).then((items: unknown) => {
        (items as Item[]).forEach((unSavedItem: Item) => {
          const newItem = cloneItem(unSavedItem);
          newItem.date = date;
          newItem.saved = 1;
          objectStore.put(newItem);
        });
        (items as ItemWithID[]).forEach((unSavedItem: ItemWithID) => {
          objectStore.delete(keyRangeOnly(unSavedItem.id));
        });
      }); // catch is not necessary, it will reject in transaction.onerror().
    });
  }

  public async exportToJSON(localStorage: StorageMin = window.localStorage):
    Promise<JSONExportType> {
    try {
      const items = await this.getAllItems();
      return {
        items,
        name: localStorage.getItem('settings_name') || '',
        message: localStorage.getItem('settings_message') || '',
      };
    } catch (e) {
      return {
        items: [],
        name: '',
        message: '',
      };
    }
  }

  public async importFromJSON(jsonString: string,
    keyRangeOnly = IDBKeyRange.only,
    localStorage: StorageMin = window.localStorage):
    Promise<boolean> {
    let obj;

    try {
      obj = JSON.parse(jsonString);
    } catch (e) {
      // console.log('JSON parse error: ' + e);
      return false;
    }

    if (typeof obj !== 'object') {
      return false;
    }

    if (!Array.isArray(obj.items)) {
      return false;
    }

    const items: Item[] = [];
    (obj.items as unknown[]).forEach((itemObj) => {
      const item = getItemFromObject(itemObj);
      if (item) {
        items.push(item);
      }
    });

    const repr: JSONRepresentationType = {
      items,
      name: typeof obj.name === 'string' ? obj.name : '',
      message: typeof obj.message === 'string' ? obj.message : '',
    };

    let retVal = false;

    if (items.length) {
      await this.clearAll();
      for (let i = 0; i < items.length; ++i) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await this.addUpdateItem(items[i], keyRangeOnly);
        } catch (e) {
          console.debug(`Error adding item : ${items[i]} err = ${e}`);
          return false;
        }
      }
      retVal = true;
    }

    if (repr.name !== '') {
      localStorage.setItem('settings_name', repr.name);
      retVal = true;
    }
    if (repr.message !== '') {
      localStorage.setItem('settings_message', repr.message);
      retVal = true;
    }

    return retVal;
  }
}

export const openDb = (storageDb: IDBFactory, beSilent = false):
  Promise<ShoppingDatabase> => {
  if (beSilent) {
    console.debug = () => undefined;
  }

  return new Promise<ShoppingDatabase>((resolve, reject) => {
    console.debug(`Opening DB: ${DB_NAME}`);
    const openDbReq = storageDb.open(DB_NAME, DB_VERSION);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    openDbReq.onsuccess = function onsuccess(this: IDBRequest<IDBDatabase>) {
      console.debug(`Opened DB: ${DB_NAME}`);
      resolve(new ShoppingDatabase(this.result));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    openDbReq.onerror = (event: Event) => {
      reject(new Error(`openDb failed errCode: ${openDbReq.error}`));
    };

    type DatabaseWrapper = { result: IDBDatabase };
    type TransactionWrapper = { transaction: IDBTransaction };

    openDbReq.onupgradeneeded = (event: Event) => {
      console.debug(`openDb.onupgradeneeded : ${DB_NAME}`);
      if (!event || !event.currentTarget ||
        !(event.currentTarget as unknown as DatabaseWrapper).result) {
        console.debug(`openDb.onupgradeneeded : ${DB_NAME} no new db in event!`);
        reject(new Error('onupgradeneeded: no new db!'));
        return;
      }
      const db: IDBDatabase = (event.currentTarget as unknown as DatabaseWrapper).result;
      const tx: IDBTransaction = (event.target as unknown as TransactionWrapper).transaction;

      if (!db.objectStoreNames.contains(DB_SHOPPING_LIST_STORE_NAME)) {
        const listStore = db.createObjectStore(DB_SHOPPING_LIST_STORE_NAME,
          { keyPath: 'id', autoIncrement: true });
        listStore.createIndex('date', 'date', { unique: false });
        listStore.createIndex('saved', 'saved', { unique: false });
      } else {
        const listStore = tx.objectStore(DB_SHOPPING_LIST_STORE_NAME);
        if (!listStore.indexNames.contains('saved')) {
          listStore.createIndex('saved', 'saved', { unique: false });
        }
      }
    };

    openDbReq.onblocked = () => {
      console.debug(`openDb.onupgradeneeded : ${DB_NAME} blocked on other tabs`);
      reject(new Error('openDb upgrade: close other tabs and try again.'));
    };
  });
};

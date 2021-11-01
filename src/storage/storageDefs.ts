import { Item, cloneItem, BooleanNumber, JSONRepresentationType, getItemFromObject, StorageMin } from '../types/item';

const DB_NAME = 'shopping-list-app-db';
const DB_VERSION = 3;
const DB_SHOPPING_LIST_STORE_NAME = 'shopping-list-store';

export class ShoppingDatabase {
    private db: IDBDatabase;
    constructor (db: IDBDatabase) {
        this.db = db;
    }

    getAllItems(maxCount: number = -1) {
        return new Promise((resolve: (x: Item[]) => void, reject) => {
            let objectStore = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME).objectStore(DB_SHOPPING_LIST_STORE_NAME);
            let getReq = objectStore.getAll(null, maxCount > 0 ? maxCount : undefined);
            getReq.onerror = function(event: Event) {
                console.debug('getAllItems getAll() failed');
                reject(DB_SHOPPING_LIST_STORE_NAME + ' getAll: errCode' +
                    event && event.target ? (event.target as any).errorCode : 'unknown');
            };

            getReq.onsuccess = function(this: IDBRequest<any[]>) {
                console.debug('getAllItems: getAll() succeeded.');
                resolve(this.result);
            };
        });
    }

    getItemsWithDate(date: Date, keyRangeOnly: (x: any) => IDBKeyRange = IDBKeyRange.only, transaction?: IDBTransaction) {
        return new Promise((resolve: (items: Item[]) => void, reject) => {
            let objectStore = (transaction ? transaction : this.db.transaction(DB_SHOPPING_LIST_STORE_NAME))
                .objectStore(DB_SHOPPING_LIST_STORE_NAME);
            let getReq = objectStore.index('date').getAll(keyRangeOnly(date));

            getReq.onerror = function(event: Event) {
                console.debug('getItemsWithDate .index("date").getAll() failed');
                reject(DB_SHOPPING_LIST_STORE_NAME + ' index("date").getAll: errCode' +
                    event && event.target ? (event.target as any).errorCode : 'unknown');
            }

            getReq.onsuccess = function(this: IDBRequest<any[]>) {
                console.debug('getItemsWithDate .index("date").getAll() succeeded');
                resolve(this.result);
            }
        });
    }

    getItemsSaved(saved: BooleanNumber, keyRangeOnly: (x: any) => IDBKeyRange = IDBKeyRange.only, transaction?: IDBTransaction) {
        return new Promise((resolve: (items: Item[]) => void, reject) => {
            let objectStore = (transaction ? transaction : this.db.transaction(DB_SHOPPING_LIST_STORE_NAME))
                .objectStore(DB_SHOPPING_LIST_STORE_NAME);
            let getReq = objectStore.index('saved').getAll(keyRangeOnly(saved));

            getReq.onerror = function(event: Event) {
                console.debug('getItemsSaved .index("date").getAll() failed');
                reject(DB_SHOPPING_LIST_STORE_NAME + ' index("date").getAll: errCode' +
                    event && event.target ? (event.target as any).errorCode : 'unknown');
            }

            getReq.onsuccess = function(this: IDBRequest<any[]>) {
                console.debug('getItemsSaved .index("date").getAll() succeeded');
                resolve(this.result);
            }
        });
    }

    deleteItem(item: Item, keyRangeOnly: (x: any) => IDBKeyRange = IDBKeyRange.only) {
        const transaction = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, "readwrite");
        let objectStore = transaction.objectStore(DB_SHOPPING_LIST_STORE_NAME);
        return this.getItemsWithDate(item.date, keyRangeOnly, transaction).then((items) => {
            return new Promise((resolve, reject) => {
                console.debug('deleteItem: getItemsWithDate succeeded');
                let found = false;
                const onerror = (event: Event) => {
                    console.debug('deleteItem add/update failed');
                    reject(DB_SHOPPING_LIST_STORE_NAME + ' add/update failed: errCode' +
                        event && event.target ? (event.target as any).errorCode : 'unknown');
                }

                const onsuccess = function() {
                    console.debug('deleteItem: add/update succeeded.');
                    resolve(undefined);
                }

                items.forEach(function(matchItem: any) {
                    if (!found && matchItem.name === item.name && matchItem.saved === item.saved) {
                        console.debug('deleteItem: found a matching item, deleting it...');
                        let setReq = objectStore.delete(keyRangeOnly(matchItem.id));
                        setReq.onerror = onerror;
                        setReq.onsuccess = onsuccess;
                        found = true;
                    }
                });

                if (!found) {
                    console.debug('warning: deleteItem no matching entry.');
                    resolve(undefined);
                }
            });
        }).catch((reason: any) => {
            console.debug('deleteItem: getItemsWithDate() failed');
            return Promise.reject(DB_SHOPPING_LIST_STORE_NAME + ' getItemsWithDate: reason ' + reason);
        });;
    }

    clearAll() {
        return new Promise((resolve, reject) => {
            let request = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, "readwrite")
                .objectStore(DB_SHOPPING_LIST_STORE_NAME).clear();
            request.onerror = function(event: Event) {
                console.debug('clearAll: clear() failed');
                reject(DB_SHOPPING_LIST_STORE_NAME + ' clear: errCode' +
                    event && event.target ? (event.target as any).errorCode : 'unknown');
            }

            request.onsuccess = function(this: IDBRequest<undefined>) {
                console.debug('clearAll: clear() succeeded');
                resolve(this.result);
            }
        });
    }

    clearUnsaved(keyRangeOnly: (x: any) => IDBKeyRange = IDBKeyRange.only) {
        const transaction = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, "readwrite");
        let objectStore = transaction.objectStore(DB_SHOPPING_LIST_STORE_NAME);
        return new Promise<undefined>((resolve, reject) => {
            transaction.onerror = (event: Event) => {
                console.debug('clearUnsaved: clear() failed');
                reject(DB_SHOPPING_LIST_STORE_NAME + ' clear: errCode' +
                    event && event.target ? (event.target as any).errorCode : 'unknown');
            };

            transaction.oncomplete = function() {
                console.debug('clearUnsaved: clear() succeeded');
                resolve(undefined);
            };

            this.getItemsSaved(0, keyRangeOnly, transaction).then((items: Item[]) => {
                items.forEach(function(clearItem: any) {
                    objectStore.delete(keyRangeOnly(clearItem.id));
                });
            }); // catch is not necessary, it will reject in transaction.onerror().
        });
    }

    addUpdateItem(item: Item, keyRangeOnly: (x: any) => IDBKeyRange = IDBKeyRange.only) {
        const transaction = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, "readwrite");
        let objectStore = transaction.objectStore(DB_SHOPPING_LIST_STORE_NAME);
        return this.getItemsWithDate(item.date, keyRangeOnly, transaction).then((items: Item[]) => {
            return new Promise((resolve, reject) => {
                console.debug('addUpdateItem: getItemsWithDate succeeded');
                let found = false;
                const onerror = (event: Event) => {
                    console.debug('addUpdateItem add/update failed');
                    reject(DB_SHOPPING_LIST_STORE_NAME + ' add/update failed: errCode' +
                        event && event.target ? (event.target as any).errorCode : 'unknown');
                }

                const onsuccess = function(this: IDBRequest<IDBValidKey>) {
                    console.debug('addUpdateItem: add/update succeeded.');
                    resolve(this.result);
                }

                items.forEach(function(prevItem: any) {
                    if (!found && prevItem.name === item.name) {
                        console.debug('addUpdateItem: found a matching item, updating it...');
                        let itemClone = cloneItem(item) as any;
                        itemClone.id = prevItem.id;
                        let setReq = objectStore.put(itemClone);
                        setReq.onerror = onerror;
                        setReq.onsuccess = onsuccess;
                        found = true;
                    }
                });

                if (!found) {
                    console.debug('addUpdateItem no matching entry yet');
                    let setReq = objectStore.add(item);
                    setReq.onerror = onerror;
                    setReq.onsuccess = onsuccess;
                    return;
                }
            });
        }).catch((reason: any) => {
            console.debug('addUpdateItem: getItemsWithDate() failed');
            return Promise.reject(DB_SHOPPING_LIST_STORE_NAME + ' getItemsWithDate: reason ' + reason);
        });
    }

    saveUnsaved(date: Date, keyRangeOnly: (x: any) => IDBKeyRange = IDBKeyRange.only) {
        const transaction = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, "readwrite");
        let objectStore = transaction.objectStore(DB_SHOPPING_LIST_STORE_NAME);
        return new Promise<undefined>((resolve, reject) => {
            transaction.onerror = (event: Event) => {
                console.debug('saveUnsaved: transaction failed');
                reject(DB_SHOPPING_LIST_STORE_NAME + ' transaction: errCode' +
                    event && event.target ? (event.target as any).errorCode : 'unknown');
            };

            transaction.oncomplete = function() {
                console.debug('saveUnsaved: transaction succeeded');
                resolve(undefined);
            };

            this.getItemsSaved(0, keyRangeOnly, transaction).then((items: Item[]) => {
                items.forEach(function(unSavedItem: Item) {
                    const newItem = cloneItem(unSavedItem);
                    newItem.date = date;
                    newItem.saved = 1;
                    objectStore.put(newItem);
                });
                items.forEach(function(unSavedItem: any) {
                    objectStore.delete(keyRangeOnly(unSavedItem.id));
                });
            }); // catch is not necessary, it will reject in transaction.onerror().
        });
    }

    public async exportToJSON(localStorage: StorageMin = window.localStorage) {
        try {
            const items = await this.getAllItems();
            return {
                items: items,
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
        keyRangeOnly: (x: any) => IDBKeyRange = IDBKeyRange.only,
        localStorage: StorageMin = window.localStorage) {

        const obj = JSON.parse(jsonString);
        if (typeof obj !== 'object')
            return false;

        if (!Array.isArray(obj.items))
            return false;

        let items: Item[] = [];
        (obj.items as any[]).forEach(itemObj => {
            const item = getItemFromObject(itemObj);
            if (item)
                items.push(item);
        });

        const repr: JSONRepresentationType = {
            items: items,
            name: typeof obj.name === 'string' ? obj.name : '',
            message: typeof obj.message === 'string' ? obj.message : '',
        }

        if (items.length) {
            await this.clearAll();
            for (let i = 0; i < items.length; ++i) {
                try {
                    await this.addUpdateItem(items[i], keyRangeOnly);
                } catch (e) {
                    console.debug('Error adding item : ' + items[i] + ' err = ' + e);
                    return false;
                }
            }
        }

        if (repr.name !== '')
            localStorage.setItem('settings_name', repr.name);
        if (repr.message !== '')
            localStorage.setItem('settings_message', repr.message);

        return true;
    }
}

export const openDb = (storageDb: IDBFactory, beSilent: boolean = false) => {
    if (beSilent) {
        console.debug = () => {};
    }
    return new Promise(function(resolve: (db: ShoppingDatabase) => any, reject) {
        console.debug('Opening DB: ' + DB_NAME);
        var openDbReq = storageDb.open(DB_NAME, DB_VERSION);
        openDbReq.onsuccess = function(this: IDBRequest<IDBDatabase>) {
            console.debug('Opened DB: ' + DB_NAME);
            resolve(new ShoppingDatabase(this.result));
        };
        openDbReq.onerror = function(event: Event) {
            reject('openDb failed errCode: ' +
                event && event.target ? (event.target as any).errorCode : 'unknown');
        };
        openDbReq.onupgradeneeded = function (event: Event) {
            console.debug("openDb.onupgradeneeded : " + DB_NAME);
            if (!event || !event.currentTarget || !(event.currentTarget as any).result) {
                console.debug("openDb.onupgradeneeded : " + DB_NAME + ' no new db in event!');
                reject('onupgradeneeded: no new db!');
                return;
            }
            const db: IDBDatabase = (event.currentTarget as any).result;
            const tx: IDBTransaction = (event.target as any).transaction;

            if (!db.objectStoreNames.contains(DB_SHOPPING_LIST_STORE_NAME)) {
                let listStore = db.createObjectStore(DB_SHOPPING_LIST_STORE_NAME,
                    { keyPath: 'id', autoIncrement: true});
                listStore.createIndex('date', 'date', { unique: false });
                listStore.createIndex('saved', 'saved', { unique: false });
            } else {
                let listStore = tx.objectStore(DB_SHOPPING_LIST_STORE_NAME);
                if(!listStore.indexNames.contains('saved')) {
                    listStore.createIndex('saved', 'saved', { unique: false });
                }
            }
        };
        openDbReq.onblocked = function () {
            console.debug("openDb.onupgradeneeded : " + DB_NAME + ' blocked on other tabs');
            reject('openDb upgrade: close other tabs and try again.');
        }
    });
}
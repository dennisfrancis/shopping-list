import { Item, ShoppingListItem } from '../types/item';

const DB_NAME = 'shopping-list-app-db';
const DB_VERSION = 1;
const DB_MASTER_STORE_NAME = 'master-items-store';
const DB_SHOPPING_LIST_STORE_NAME = 'shopping-list-store';

class ShoppingDatabase {
    private db: IDBDatabase;
    constructor (db: IDBDatabase) {
        this.db = db;
    }

    getMasterList() {
        return new Promise((resolve, reject) => {
            let request = this.db.transaction(DB_MASTER_STORE_NAME)
                .objectStore(DB_MASTER_STORE_NAME).getAll();
            request.onerror = function(event: Event) {
                console.debug('getMasterList getAll() failed');
                reject(DB_MASTER_STORE_NAME + ' getAll: errCode' +
                    event && event.target ? (event.target as any).errorCode : 'unknown');
            }

            request.onsuccess = function(this: IDBRequest<any[]>) {
                console.debug('getMasterList getAll() succeded');
                resolve(this.result);
            }
        });
    }

    addUpdateItemToMasterList(item: Item) {
        return new Promise((resolve, reject) => {
            let request = this.db.transaction(DB_MASTER_STORE_NAME, "readwrite")
                .objectStore(DB_MASTER_STORE_NAME).put(item);
            request.onerror = function(event: Event) {
                console.debug('addUpdateItemToMasterList put() failed');
                reject(DB_MASTER_STORE_NAME + ' put: errCode' +
                    event && event.target ? (event.target as any).errorCode : 'unknown');
            }

            request.onsuccess = function(this: IDBRequest<IDBValidKey>) {
                console.debug('addUpdateItemToMasterList put() succeded');
                resolve(this.result);
            }
        });
    }

    addUpdateShoppingListItem(item: ShoppingListItem) {
        return new Promise((resolve, reject) => {
            let objectStore = this.db.transaction(DB_SHOPPING_LIST_STORE_NAME, "readwrite").objectStore(DB_SHOPPING_LIST_STORE_NAME);
            let getReq = objectStore.index('date').getAll(IDBKeyRange.only(item.date));

            getReq.onerror = function(event: Event) {
                console.debug('addUpdateShoppingListItem .index("date").getAll() failed');
                reject(DB_SHOPPING_LIST_STORE_NAME + ' index("date").getAll: errCode' +
                    event && event.target ? (event.target as any).errorCode : 'unknown');
            }

            getReq.onsuccess = function(this: IDBRequest<any[]>) {
                console.debug('addUpdateShoppingListItem .index("date").getAll() succeeded');
                let found = false;
                const onerror = (event: Event) => {
                    console.debug('addUpdateShoppingListItem add/update failed');
                    reject(DB_SHOPPING_LIST_STORE_NAME + ' add/update failed: errCode' +
                        event && event.target ? (event.target as any).errorCode : 'unknown');
                }

                const onsuccess = function(this: IDBRequest<IDBValidKey>) {
                    console.debug('addUpdateShoppingListItem: add/update succeeded.');
                    resolve(this.result);
                }

                this.result.forEach(function(prevItem) {
                    if (!found && prevItem.name === item.name) {
                        console.debug('addUpdateShoppingListItem: found a matching item, updating it...');
                        let setReq = objectStore.put(item, prevItem.id);
                        setReq.onerror = onerror;
                        setReq.onsuccess = onsuccess;
                        found = true;
                    }
                });

                if (!found) {
                    console.debug('addUpdateShoppingListItem no matching entry yet');
                    let setReq = objectStore.add(item);
                    setReq.onerror = onerror;
                    setReq.onsuccess = onsuccess;
                    return;
                }
            }
        });
    }
}

export const openDb = () => {
    return new Promise(function(resolve: (db: ShoppingDatabase) => any, reject) {
        console.debug('Opening DB: ' + DB_NAME);
        var openDbReq = indexedDB.open(DB_NAME, DB_VERSION);
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
            let db: IDBDatabase = (event.currentTarget as any).result;
            db.createObjectStore(DB_MASTER_STORE_NAME,
                { keyPath: 'name', autoIncrement: false });
            let listStore = db.createObjectStore(DB_SHOPPING_LIST_STORE_NAME,
                { keyPath: 'id', autoIncrement: true});
            listStore.createIndex('date', 'date', { unique: false });
        };
        openDbReq.onblocked = function () {
            console.debug("openDb.onupgradeneeded : " + DB_NAME + ' blocked on other tabs');
            reject('openDb upgrade: close other tabs and try again.');
        }
    });
}
declare module 'fake-indexeddb' {
    const indexedDB: IDBFactory;
    export = indexedDB;
}
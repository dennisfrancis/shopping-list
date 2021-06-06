/// <reference path="./fake-indexeddb.d.ts" />
import indexedDB = require('fake-indexeddb');
import { openDb } from '../src/storage/storageDefs';

// TODO: clean up after every test (eg. only the first one calls 'onupgradeneeded')
test('openDb must create database and master/shopping-list stores', async () => {
    const db = await openDb(indexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const masterObjectList = await db.getMasterList() as any[];
    expect(masterObjectList).toHaveLength(0);
    const shoppingObjectList = await db.getShoppingListItems() as any[];
    expect(shoppingObjectList).toHaveLength(0);
});

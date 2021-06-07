import { openDb, ShoppingDatabase } from '../src/storage/storageDefs';
import { Item, SItemfromItem } from '../src/types/item';

declare class FDBKeyRangeWithOnly extends IDBKeyRange {
    only: (x: any) => IDBKeyRange;
};

let fakeIndexedDB = require('fake-indexeddb/build/fakeIndexedDB').default as IDBFactory;
let FDBKeyRange = require('fake-indexeddb/build/FDBKeyRange').default as FDBKeyRangeWithOnly;

afterEach(async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    await db.clearMasterList();
    await db.clearShoppingList();
    await checkEmptyStores(db)
});

async function checkEmptyStores(db: ShoppingDatabase) {
    const masterObjectList = await db.getMasterList() as any[];
    expect(masterObjectList).toHaveLength(0);
    const shoppingObjectList = await db.getShoppingListItems() as any[];
    expect(shoppingObjectList).toHaveLength(0);
}

test('openDb must create database and master/shopping-list stores', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    await checkEmptyStores(db)
});

test('items must persist in master store', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const items: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: ''
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: '(curry cut)'
        }
    ];

    items.forEach(async item => {
        await db.addUpdateItemToMasterList(item);
    })

    items.forEach(async item => {
        await db.addUpdateShoppingListItem(SItemfromItem(item), FDBKeyRange.only);
    })

    const masterList = await db.getMasterList() as Item[];
    expect(masterList).toHaveLength(items.length);

    masterList.forEach((masterItem, index) => {
        expect(masterItem.name).toEqual(items[index].name);
        expect(masterItem.quantity).toEqual(items[index].quantity);
        expect(masterItem.unit).toEqual(items[index].unit);
        expect(masterItem.comment).toEqual(items[index].comment);
    });

    const shoppingList = await db.getShoppingListItems() as any[];
    expect(shoppingList).toHaveLength(items.length);

    shoppingList.forEach((sitem, index) => {
        expect(sitem.name).toEqual(items[index].name);
        expect(sitem.quantity).toEqual(items[index].quantity);
        expect(sitem.unit).toEqual(items[index].unit);
        expect(sitem.comment).toEqual(items[index].comment);
    });
});
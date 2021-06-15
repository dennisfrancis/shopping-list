import { openDb, ShoppingDatabase } from '../src/storage/storageDefs';
import { Item } from '../src/types/item';

declare class FDBKeyRangeWithOnly extends IDBKeyRange {
    only: (x: any) => IDBKeyRange;
};

let fakeIndexedDB = require('fake-indexeddb/build/fakeIndexedDB').default as IDBFactory;
let FDBKeyRange = require('fake-indexeddb/build/FDBKeyRange').default as FDBKeyRangeWithOnly;

afterEach(async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    await db.clearAll();
    await checkEmptyStores(db)
});

async function checkEmptyStores(db: ShoppingDatabase) {
    const list = await db.getAllItems() as any[];
    expect(list).toHaveLength(0);
}

test('openDb must create database and master/shopping-list stores', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    await checkEmptyStores(db)
});

test('items must persist in store', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const date = new Date();
    const items: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 0,
            date
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: 'curry cut',
            saved: 0,
            date
        }
    ];

    items.forEach(async item => {
        await db.addUpdateItem(item, FDBKeyRange.only);
    })

    const list = await db.getAllItems() as Item[];
    expect(list).toHaveLength(items.length);

    list.forEach((item, index) => {
        expect(item.name).toEqual(items[index].name);
        expect(item.quantity).toEqual(items[index].quantity);
        expect(item.unit).toEqual(items[index].unit);
        expect(item.comment).toEqual(items[index].comment);
        expect(item.date).toEqual(items[index].date);
    });
});

test('unsaved list', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const date = new Date();
    const itemsSaved: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 1,
            date
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: 'curry cut',
            saved: 1,
            date
        }
    ];

    const itemsUnsaved: Item[] = [
        {
            name: 'Beetroot',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 0,
            date
        },
        {
            name: 'Eggs',
            quantity: 10,
            unit: 'No',
            comment: '',
            saved: 0,
            date
        }
    ];

    itemsSaved.forEach(async item => {
        await db.addUpdateItem(item, FDBKeyRange.only);
    })

    itemsUnsaved.forEach(async item => {
        await db.addUpdateItem(item, FDBKeyRange.only);
    })

    const unSavedList = await db.getItemsSaved(0, FDBKeyRange.only) as Item[];
    expect(unSavedList).toHaveLength(itemsUnsaved.length);

    unSavedList.forEach((item, index) => {
        expect(item.name).toEqual(itemsUnsaved[index].name);
        expect(item.quantity).toEqual(itemsUnsaved[index].quantity);
        expect(item.unit).toEqual(itemsUnsaved[index].unit);
        expect(item.comment).toEqual(itemsUnsaved[index].comment);
        expect(item.date).toEqual(itemsUnsaved[index].date);
    });
});

test('change item properties in db list', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const date = new Date();
    const items: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 0,
            date
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: 'curry cut',
            saved: 0,
            date
        }
    ];

    items.forEach(async item => {
        await db.addUpdateItem(item, FDBKeyRange.only);
    })

    items[1].comment = 'cubes';
    await db.addUpdateItem(items[1], FDBKeyRange.only);

    const list = await db.getAllItems() as Item[];
    expect(list).toHaveLength(items.length);

    list.forEach((item, index) => {
        expect(item.name).toEqual(items[index].name);
        expect(item.quantity).toEqual(items[index].quantity);
        expect(item.unit).toEqual(items[index].unit);
        expect(item.comment).toEqual(items[index].comment);
        expect(item.date).toEqual(items[index].date);
    });
});

test('delete item in db list', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const date = new Date();
    let items: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 0,
            date
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: 'curry cut',
            saved: 0,
            date
        }
    ];

    items.forEach(async item => {
        await db.addUpdateItem(item, FDBKeyRange.only);
    });

    await db.deleteItem(items[1], FDBKeyRange.only);

    items = [items[0]];
    const list = await db.getAllItems() as Item[];
    expect(list).toHaveLength(items.length);

    list.forEach((item, index) => {
        expect(item.name).toEqual(items[index].name);
        expect(item.quantity).toEqual(items[index].quantity);
        expect(item.unit).toEqual(items[index].unit);
        expect(item.comment).toEqual(items[index].comment);
        expect(item.date).toEqual(items[index].date);
    });
});
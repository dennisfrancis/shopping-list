import { openDb, ShoppingDatabase } from '../src/storage/storageDefs';
import { cloneItem, Item } from '../src/types/item';

declare class FDBKeyRangeWithOnly extends IDBKeyRange {
    only: (x: any) => IDBKeyRange;
};

let fakeIndexedDB = require('fake-indexeddb/build/fakeIndexedDB').default as IDBFactory;
let FDBKeyRange = require('fake-indexeddb/build/FDBKeyRange').default as FDBKeyRangeWithOnly;

class LocalStorageMock {
    private store: Map<string, string>;

    constructor() {
        this.store = new Map<string, string>();
    }

    clear() {
        this.store.clear();
    }

    getItem(key: string) {
        return this.store.get(key) || null;
    }

    setItem(key: string, value: string) {
        this.store.set(key, value);
    }

    removeItem(key: string) {
        this.store.delete(key);
    }
}

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
    const category = undefined;
    const items: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 0,
            date,
            category: 'vegetables',
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: 'curry cut',
            saved: 0,
            date,
            category
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
        expect(item.saved).toEqual(items[index].saved);
        expect(item.category).toEqual(items[index].category);
    });
});

test('unsaved list', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const date = new Date();
    const category = undefined;
    const itemsSaved: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 1,
            date,
            category,
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: 'curry cut',
            saved: 1,
            date,
            category,
        }
    ];

    const itemsUnsaved: Item[] = [
        {
            name: 'Beetroot',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 0,
            date,
            category,
        },
        {
            name: 'Eggs',
            quantity: 10,
            unit: 'No',
            comment: '',
            saved: 0,
            date,
            category,
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
        expect(item.saved).toEqual(itemsUnsaved[index].saved);
    });
});

test('change item properties in db list', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const date = new Date();
    const category = undefined;
    const items: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 0,
            date,
            category,
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: 'curry cut',
            saved: 0,
            date,
            category,
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
        expect(item.saved).toEqual(items[index].saved);
    });
});

test('delete item in db list', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const date = new Date();
    const category = undefined;
    let items: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 0,
            date,
            category,
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: 'curry cut',
            saved: 0,
            date,
            category,
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
        expect(item.saved).toEqual(items[index].saved);
    });
});

test('clear unsaved items in db list', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const date = new Date();
    const category = undefined;
    let items: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 0,
            date,
            category,
        },
        {
            name: 'Rice powder',
            quantity: 1,
            unit: 'Packet(s)',
            comment: '500gm',
            saved: 1,
            date,
            category,
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: 'curry cut',
            saved: 0,
            date,
            category,
        },
        {
            name: 'Garlic',
            quantity: 250,
            unit: 'gm',
            comment: '',
            saved: 1,
            date,
            category,
        },
    ];

    items.forEach(async item => {
        await db.addUpdateItem(item, FDBKeyRange.only);
    });

    await db.clearUnsaved(FDBKeyRange.only);

    const list = await db.getAllItems() as Item[];
    const savedItems = items.filter(item => item.saved === 1);
    expect(list).toHaveLength(savedItems.length);

    list.forEach((item, index) => {
        expect(item.name).toEqual(savedItems[index].name);
        expect(item.quantity).toEqual(savedItems[index].quantity);
        expect(item.unit).toEqual(savedItems[index].unit);
        expect(item.comment).toEqual(savedItems[index].comment);
        expect(item.date).toEqual(savedItems[index].date);
        expect(item.saved).toEqual(savedItems[index].saved);
    });
});

test('save unsaved items in db list', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const date = new Date();
    const category = undefined;
    let items: Item[] = [
        {
            name: 'Cabbage',
            quantity: 1,
            unit: 'Kg',
            comment: '',
            saved: 0,
            date,
            category,
        },
        {
            name: 'Rice powder',
            quantity: 1,
            unit: 'Packet(s)',
            comment: '500gm',
            saved: 1,
            date,
            category,
        },
        {
            name: 'Chicken',
            quantity: 1,
            unit: 'Kg',
            comment: 'curry cut',
            saved: 0,
            date,
            category,
        },
        {
            name: 'Garlic',
            quantity: 250,
            unit: 'gm',
            comment: '',
            saved: 1,
            date,
            category,
        },
    ];

    items.forEach(async item => {
        await db.addUpdateItem(item, FDBKeyRange.only);
    });

    // save date.
    const saveDate = new Date('4 June 2021 13:45:21');
    await db.saveUnsaved(saveDate, FDBKeyRange.only);

    const list = await db.getAllItems() as Item[];
    const curItems: Item[] = [
        ...items.filter(item => item.saved === 1),
        ...items.filter(item => item.saved === 0)
            .map(item => {
                const newItem = cloneItem(item);
                newItem.date = saveDate;
                newItem.saved = 1;
                return newItem;
            })
    ];
    expect(list).toHaveLength(curItems.length);

    list.forEach((item, index) => {
        expect(item.name).toEqual(curItems[index].name);
        expect(item.quantity).toEqual(curItems[index].quantity);
        expect(item.unit).toEqual(curItems[index].unit);
        expect(item.comment).toEqual(curItems[index].comment);
        expect(item.date).toEqual(curItems[index].date);
        expect(item.saved).toEqual(curItems[index].saved);
    });
});

const dateImpExp = new Date();
const itemsImpExp: Item[] = [
    {
        name: 'Cabbage',
        quantity: 1,
        unit: 'Kg',
        comment: '',
        saved: 0,
        date: dateImpExp,
        category: 'Vegetables',
    },
    {
        name: 'Rice powder',
        quantity: 1,
        unit: 'Packet(s)',
        comment: '500gm',
        saved: 1,
        date: dateImpExp,
        category: undefined,
    },
    {
        name: 'Chicken',
        quantity: 1,
        unit: 'Kg',
        comment: 'curry cut',
        saved: 0,
        date: dateImpExp,
        category: undefined,
    },
    {
        name: 'Garlic',
        quantity: 250,
        unit: 'gm',
        comment: '',
        saved: 1,
        date: dateImpExp,
        category: 'Vegetables',
    },
];


test('export import test', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const items = itemsImpExp;

    items.forEach(async item => {
        await db.addUpdateItem(item, FDBKeyRange.only);
    });

    let localStorage = new LocalStorageMock();
    localStorage.setItem('settings_name', 'Amos');
    localStorage.setItem('settings_message', 'Address: 32P1 seller av. 34571');

    let localStorageAfterImport = new LocalStorageMock();

    const repr = await db.exportToJSON(localStorage);
    const ok = await db.importFromJSON(JSON.stringify(repr), FDBKeyRange.only, localStorageAfterImport);

    expect(ok).toBeTruthy();

    const list = await db.getAllItems() as Item[];

    expect(list).toHaveLength(items.length);

    list.forEach((item, index) => {
        expect(item.name).toEqual(items[index].name);
        expect(item.quantity).toEqual(items[index].quantity);
        expect(item.unit).toEqual(items[index].unit);
        expect(item.comment).toEqual(items[index].comment);
        expect(item.date).toEqual(items[index].date);
        expect(item.saved).toEqual(items[index].saved);
        expect(item.category).toEqual(items[index].category)
    });

    expect(localStorageAfterImport.getItem('settings_name')).toEqual(localStorage.getItem('settings_name'));
    expect(localStorageAfterImport.getItem('settings_message')).toEqual(localStorage.getItem('settings_message'));
});

test('import empty items test', async () => {
    const db = await openDb(fakeIndexedDB, true /* beSilent */);
    expect(db).toBeTruthy();
    const items = itemsImpExp;

    items.forEach(async item => {
        await db.addUpdateItem(item, FDBKeyRange.only);
    });

    let localStorage = new LocalStorageMock();
    let localStorageAfterImport = new LocalStorageMock();
    const settingsName = 'Amos';
    const settingsMessage = 'Address: 32P1 seller av. 34571';
    [localStorage, localStorageAfterImport].forEach(strg => {
        strg.setItem('settings_name', settingsName);
        strg.setItem('settings_message', settingsMessage);
    });

    const jsonString = '{"items": []}';
    const ok = await db.importFromJSON(jsonString, FDBKeyRange.only, localStorageAfterImport);

    expect(ok).toBeTruthy();

    const list = await db.getAllItems() as Item[];

    expect(list).toHaveLength(items.length);

    list.forEach((item, index) => {
        expect(item.name).toEqual(items[index].name);
        expect(item.quantity).toEqual(items[index].quantity);
        expect(item.unit).toEqual(items[index].unit);
        expect(item.comment).toEqual(items[index].comment);
        expect(item.date).toEqual(items[index].date);
        expect(item.saved).toEqual(items[index].saved);
        expect(item.category).toEqual(items[index].category)
    });

    expect(localStorageAfterImport.getItem('settings_name')).toEqual(localStorage.getItem('settings_name'));
    expect(localStorageAfterImport.getItem('settings_message')).toEqual(localStorage.getItem('settings_message'));
});
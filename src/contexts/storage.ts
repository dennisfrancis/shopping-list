import React from 'react'
import { Item, ShoppingListItem } from '../types/item';
import { ShoppingDatabase } from '../storage/storageDefs';

export class StorageType {
    private db: ShoppingDatabase | undefined = undefined;
    private masterListeners = new Set<((x: Item[]) => void)>();
    private sListListeners = new Set<((x: ShoppingListItem[]) => void)>();
    constructor(db?: ShoppingDatabase) {
        this.db = db;
        this.invokeMasterListeners = this.invokeMasterListeners.bind(this);
        this.invokeSListListeners = this.invokeSListListeners.bind(this);
    }

    public setDB(db: ShoppingDatabase) {
        this.db = db;
    }

    public hasDB(): boolean {
        return !!this.db;
    }

    private invokeMasterListeners(items: Item[]) {
        // console.log('Invoking ' + this.masterListeners.size + ' master listeners.');
        this.masterListeners.forEach((listener) => {
            listener(items);
        });
    }

    private invokeSListListeners(items: ShoppingListItem[]) {
        this.sListListeners.forEach((listener) => {
            listener(items);
        });
    }

    public fetch() {
        if (!this.db)
            return;

        this.db.getMasterList().then(this.invokeMasterListeners);
        this.db.getShoppingListItems().then(this.invokeSListListeners);
    }

    public addMasterListener(listener: (x: Item[]) => void) {
        this.masterListeners.add(listener);
    }

    public removeMasterListener(listener: (x: Item[]) => void) {
        this.masterListeners.delete(listener);
    }

    public addSListListener(listener: (x: ShoppingListItem[]) => void) {
        this.sListListeners.add(listener);
    }

    public removeSListListener(listener: (x: ShoppingListItem[]) => void) {
        this.sListListeners.delete(listener);
    }

    public addUpdateMaster(item: Item) {
        if (!this.db)
            return;

        this.db.addUpdateItemToMasterList(item);
    }

    public addUpdateSList(item: ShoppingListItem) {
        if (!this.db)
            return;

        this.db.addUpdateShoppingListItem(item);
    }
};

export const StorageContext = React.createContext({} as StorageType);
export const StorageProvider = StorageContext.Provider;
/* eslint-disable */
import React from 'react'
import { Item } from '../types/item';
import { ShoppingDatabase } from '../storage/storageDefs';

export class StorageType {
    private db: ShoppingDatabase | undefined = undefined;
    private listeners = new Set<((x: Item[]) => void)>();
    constructor(db?: ShoppingDatabase) {
        this.db = db;
        this.invokeListeners = this.invokeListeners.bind(this);
    }

    public setDB(db: ShoppingDatabase) {
        this.db = db;
    }

    public hasDB(): boolean {
        return !!this.db;
    }

    private invokeListeners(items: Item[]) {
        // console.log('Invoking ' + this.masterListeners.size + ' master listeners.');
        this.listeners.forEach((listener) => {
            listener(items);
        });
    }

    public fetch() {
        if (!this.db)
            return;

        this.db.getAllItems().then(this.invokeListeners);
    }

    public addListener(listener: (x: Item[]) => void) {
        this.listeners.add(listener);
    }

    public removeListener(listener: (x: Item[]) => void) {
        this.listeners.delete(listener);
    }

    public addUpdate(item: Item) {
        if (!this.db)
            return;

        this.db.addUpdateItem(item);
    }

    public delete(item: Item) {
        if (!this.db)
            return;

        this.db.deleteItem(item);
    }

    public clearUnsaved() {
        if (!this.db)
            return;

        return this.db.clearUnsaved();
    }

    public saveUnsaved(saveDate: Date) {
        if (!this.db)
            return;

        return this.db.saveUnsaved(saveDate);
    }

    public async exportToJSONText() {
        let obj;
        try {
            obj = await this.db?.exportToJSON();
        } catch (e) {
            return '';
        }

        return JSON.stringify(obj);
    }

    public async importFromJSONText(jsonText: string) {
        let res = false;
        try {
            res = !! await this.db?.importFromJSON(jsonText);
        } catch (e) {
            return false;
        }

        return res;
    }
};

export const StorageContext = React.createContext({} as StorageType);
export const StorageProvider = StorageContext.Provider;
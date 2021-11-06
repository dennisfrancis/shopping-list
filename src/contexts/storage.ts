import React from 'react';
import { Item } from '../types/item';
import { ShoppingDatabase } from '../storage/storageDefs';

// eslint-disable-next-line no-unused-vars
type ListenerType = (x: Item[]) => void;

export class StorageType {
  private db: ShoppingDatabase | undefined = undefined;

  private listeners = new Set<ListenerType>();

  constructor(db?: ShoppingDatabase) {
    this.db = db;
    this.invokeListeners = this.invokeListeners.bind(this);
  }

  public setDB(db: ShoppingDatabase): void {
    this.db = db;
  }

  public hasDB(): boolean {
    return !!this.db;
  }

  private invokeListeners(items: Item[]): void {
    // console.log('Invoking ' + this.masterListeners.size + ' master listeners.');
    this.listeners.forEach((listener) => {
      listener(items);
    });
  }

  public fetch(): void {
    if (!this.db) {
      return;
    }

    this.db.getAllItems().then(this.invokeListeners);
  }

  public addListener(listener: ListenerType): void {
    this.listeners.add(listener);
  }

  public removeListener(listener: ListenerType): void {
    this.listeners.delete(listener);
  }

  public addUpdate(item: Item): void {
    if (!this.db) {
      return;
    }

    this.db.addUpdateItem(item);
  }

  public delete(item: Item): void {
    if (!this.db) {
      return;
    }

    this.db.deleteItem(item);
  }

  public clearUnsaved(): Promise<undefined> {
    if (!this.db) {
      return new Promise<undefined>(() => undefined);
    }

    return this.db.clearUnsaved();
  }

  public saveUnsaved(saveDate: Date): Promise<undefined> {
    if (!this.db) {
      return new Promise<undefined>(() => undefined);
    }

    return this.db.saveUnsaved(saveDate);
  }

  public async exportToJSONText(): Promise<string> {
    let obj;
    try {
      obj = await this.db?.exportToJSON();
    } catch (e) {
      return '';
    }

    return JSON.stringify(obj);
  }

  public async importFromJSONText(jsonText: string): Promise<boolean> {
    let res = false;
    try {
      res = !!await this.db?.importFromJSON(jsonText);
    } catch (e) {
      return false;
    }

    return res;
  }
}

export const StorageContext = React.createContext({} as StorageType);
export const StorageProvider = StorageContext.Provider;

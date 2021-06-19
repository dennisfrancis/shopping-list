import React, { useState } from "react";
import { Item, ItemStatesAndSetters } from '../types/item';
import { ItemControls } from "../components/ItemControls";
import { DebugItemLists } from "../components/DebugItemLists";
import { ItemList } from '../components/ItemList';
import { useContext } from "react";
import { StorageContext } from "../contexts/storage";
import { useEffect } from "react";

export function NewList() {
    let [masterList, setMasterList] = useState(new Set<string>([]));
    let [dbIsEmpty, setDBIsEmpty] = useState(false);
    let [masterItems, setMasterItems] = useState([] as Item[]);
    let [newList, setNewList] = useState<Item[]>([]);
    let [name, setName] = useState('');
    let [quantity, setQuantity] = useState(0);
    let [unit, setUnit] = useState('');
    let [comment, setComment] = useState('');
    let [date, setDate] = useState(new Date());
    let [existing, setExisting] = useState(false);
    let [runFetchEffect, setRunFetchEffect] = useState(false);
    const storage = useContext(StorageContext);
    let itemStatesAndSetters: ItemStatesAndSetters = {
        name,
        setName,
        quantity,
        setQuantity,
        unit,
        setUnit,
        comment,
        setComment,
        existing,
        setExisting,
        date,
        setDate
    };

    // fetch initial state from DB.
    useEffect(() => {
        if (!runFetchEffect && (masterList.size || dbIsEmpty)) {
            return;
        }

        if (storage.hasDB()) {
            // console.log('Fetching...');
            storage.fetch();
        }

        const dbListener = (mList: Item[]) => {
            if (runFetchEffect)
                setRunFetchEffect(false);
            setDBIsEmpty((mList.length === 0));
            setMasterList(new Set<string>(mList.map(item => item.name)));
            const nameToItem = new Map<string, Item>();
            const currentList: Item[] = [];
            mList.forEach((item) => {
                if (!item.saved)
                    currentList.push(item);

                let prevItem = nameToItem.get(item.name);
                if (!prevItem)
                    nameToItem.set(item.name, item);
                else if (prevItem.date < item.date)
                    nameToItem.set(item.name, item);
            });
            setMasterItems([...nameToItem.values()]);
            setNewList(currentList);
            if (currentList.length) {
                setDate(currentList[0].date);
            }
        };
        storage.addListener(dbListener);

        return function cleanup() {
            storage.removeListener(dbListener);
        };
    });

    const removeItem = (item: Item) => {
        const nameToRemove = item.name;
        const list = newList.filter(oldItem => oldItem.name !== nameToRemove);
        storage.delete(item);
        setNewList(list);
        if (name === nameToRemove) {
            setName('');
            setQuantity(0);
            setUnit('');
            setComment('');
            setExisting(false);
        }
    };

    let debugMode = false;

    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: "flex-start"}}>
            <ItemControls masterList={masterList} setMasterList={setMasterList}
                newList={newList} setNewList={setNewList}
                masterItems={masterItems} newItemStatesAndSetters={itemStatesAndSetters}/>
            <ItemList newList={newList} newItemStatesAndSetters={itemStatesAndSetters}
                removeItem={removeItem} setRunFetchEffect={setRunFetchEffect}/>
            {debugMode && <DebugItemLists masterList={masterList} newList={newList} />}
        </div>
    );
}

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
    let [masterItems, setMasterItems] = useState([] as Item[]);
    let [newList, setNewList] = useState<Item[]>([]);
    let [name, setName] = useState('');
    let [quantity, setQuantity] = useState(0);
    let [unit, setUnit] = useState('');
    let [comment, setComment] = useState('');
    let [existing, setExisting] = useState(false);
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
        setExisting
    };

    useEffect(() => {
        storage.addMasterListener((masterList) => {
            setMasterList(new Set<string>(masterList.map(item => item.name)));
            setMasterItems(masterList);
        });
    }, [storage]);

    const removeItem = (item: Item) => {
        const nameToRemove = item.name;
        const list = newList.filter(oldItem => oldItem.name !== nameToRemove);
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
            <ItemList newList={newList} newItemStatesAndSetters={itemStatesAndSetters} removeItem={removeItem}/>
            {debugMode && <DebugItemLists masterList={masterList} newList={newList} />}
        </div>
    );
}

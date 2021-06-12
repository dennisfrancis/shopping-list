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
        });
    }, [storage]);

    let debugMode = false;

    return (<div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <ItemControls masterList={masterList} setMasterList={setMasterList}
                newList={newList} setNewList={setNewList} newItemStatesAndSetters={itemStatesAndSetters}/>
            <ItemList newList={newList} newItemStatesAndSetters={itemStatesAndSetters}/>
            {debugMode && <DebugItemLists masterList={masterList} newList={newList} />}
        </div>
    </div>);
}

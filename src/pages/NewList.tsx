import React, { useState } from "react";
import { Item, ItemStatesAndSetters } from '../types/item';
import { ItemControls } from "../components/ItemControls";
import { DebugItemLists } from "../components/DebugItemLists";
import { ItemList } from '../components/ItemList';

export function NewList() {
    let [masterList, setMasterList] = useState(new Set<string>(['Cabbage', 'Banana', 'Carrot']));
    let [newList, setNewList] = useState<Item[]>([]);
    let [name, setName] = useState('');
    let [quantity, setQuantity] = useState(0);
    let [unit, setUnit] = useState('');
    let [comment, setComment] = useState('');
    let itemStatesAndSetters: ItemStatesAndSetters = {
        name,
        setName,
        quantity,
        setQuantity,
        unit,
        setUnit,
        comment,
        setComment
    };
    let debugMode = false;

    return (<div>
        <h2>New shopping list</h2>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <ItemControls masterList={masterList} setMasterList={setMasterList}
                newList={newList} setNewList={setNewList} newItemStatesAndSetters={itemStatesAndSetters}/>
            <ItemList newList={newList}/>
            {debugMode && <DebugItemLists masterList={masterList} newList={newList} />}
        </div>
    </div>);
}

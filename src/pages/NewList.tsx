import React, { useState } from "react";
import { Item } from '../types/item';
import { ItemControls } from "../components/ItemControls";
import { DebugItemLists } from "../components/DebugItemLists";
import { ItemList } from '../components/ItemList';

function NewList() {
    let [masterList, setMasterList] = useState(new Set<string>(['Cabbage', 'Banana', 'Carrot']));
    let [newList, setNewList] = useState<Item[]>([]);
    let debugMode = false;

    return (<div>
        <h2>New shopping list</h2>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <ItemControls masterList={masterList} setMasterList={setMasterList} newList={newList} setNewList={setNewList}/>
            <ItemList newList={newList}/>
            {debugMode && <DebugItemLists masterList={masterList} newList={newList} />}
        </div>
    </div>);
}

export default NewList;
import React, { useState } from "react";
import { Item } from '../types/item';
import { ItemControls } from "../components/ItemControls";
import { DebugItemLists } from "../components/DebugItemLists";

function NewList() {
    let [masterList, setMasterList] = useState(new Set<string>(['Cabbage', 'Banana', 'Carrot']));
    let [newList, setNewList] = useState<Item[]>([]);

    return (<div>
        <h2>New shopping list</h2>
        <ItemControls masterList={masterList} setMasterList={setMasterList} newList={newList} setNewList={setNewList}/>
        <DebugItemLists masterList={masterList} newList={newList} />
    </div>);
}

export default NewList;
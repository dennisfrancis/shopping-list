import React from "react";
import { Item, ItemStatesAndSetters } from '../types/item';
import { ItemControls } from "../components/ItemControls";
import { DebugItemLists } from "../components/DebugItemLists";
import { NewItemList } from '../components/ItemList';
import { useContext } from "react";
import { StorageContext } from "../contexts/storage";

import "../styles/newlist.css";

export function NewList(props: {
    masterList: Set<string>;
    masterItems: Item[];
    setMasterList: React.Dispatch<React.SetStateAction<Set<string>>>;
    newList: Item[];
    setNewList: React.Dispatch<React.SetStateAction<Item[]>>;
    newItemStatesAndSetters: ItemStatesAndSetters;
    runFetchEffect: boolean;
    setRunFetchEffect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const storage = useContext(StorageContext);
    let {
        name,
        setName,
        setQuantity,
        setUnit,
        setComment,
        setExisting,
        setCategory,
    } = props.newItemStatesAndSetters;

    const removeItem = (item: Item) => {
        const nameToRemove = item.name;
        const list = props.newList.filter(oldItem => oldItem.name !== nameToRemove);
        storage.delete(item);
        props.setNewList(list);
        if (name === nameToRemove) {
            setName('');
            setQuantity(0);
            setUnit('');
            setComment('');
            setExisting(false);
            setCategory(undefined);
        }
    };

    let debugMode = false;

    return (
        <div id="newlist-wrapper">
            <ItemControls masterList={props.masterList} setMasterList={props.setMasterList}
                newList={props.newList} setNewList={props.setNewList}
                masterItems={props.masterItems} newItemStatesAndSetters={props.newItemStatesAndSetters}/>
            <div className="sepline"></div>
            <NewItemList list={props.newList} newItemStatesAndSetters={props.newItemStatesAndSetters}
                removeItem={removeItem} setRunFetchEffect={props.setRunFetchEffect}/>
            {debugMode && <DebugItemLists masterList={props.masterList} newList={props.newList} />}
        </div>
    );
}

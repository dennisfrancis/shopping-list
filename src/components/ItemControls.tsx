import React, { useState } from "react";
import { Units } from "../consts/itemConsts";
import { Item } from '../types/item';

type ItemControlProps = {
    masterList: Set<string>;
    setMasterList: React.Dispatch<React.SetStateAction<Set<string>>>;
    newList: Item[];
    setNewList: React.Dispatch<React.SetStateAction<Item[]>>;
};

export function ItemControls(props: ItemControlProps) {
    let [newItemName, setNewItemName] = useState('');
    let [quantity, setQuantity] = useState(0);
    let [unit, setUnit] = useState('');
    let [comment, setComment] = useState('');
    let [existing, setExisting] = useState(false);

    let nextList:string[] = [];
    props.masterList.forEach(masterItem => {
        if (!props.newList.find(item => item.name === masterItem))
            nextList.push(masterItem);
    });

    function handleNewItem(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();

        if (!newItemName || !quantity || !unit)
            return;

        props.setNewList(currList => {
            let matchItemIndex = currList.findIndex((item) => item.name === newItemName);
            if (matchItemIndex === -1) {
                return [...currList, {name: newItemName, quantity, unit, comment}];
            }

            let listCopy = [...currList];
            let matchItem = listCopy[matchItemIndex];
            matchItem.quantity = quantity;
            matchItem.unit = unit;
            matchItem.comment = comment;
            return listCopy;
        });

        props.setMasterList(currentSet => {
            if (currentSet.has(newItemName))
                return currentSet;
            let newSet = new Set<string>(currentSet);
            newSet.add(newItemName);
            return newSet;
        });
        setNewItemName('');
        setQuantity(0);
        setUnit('');
        setComment('');
        setExisting(false);
    }

    function handleItemNameChange(e: React.FormEvent<HTMLInputElement>) {
        setNewItemName(e.currentTarget.value);
        setExisting(props.newList.findIndex((item) => item.name === e.currentTarget.value) !== -1);
    }

    function handleQtyChange(e: React.FormEvent<HTMLInputElement>) {
        setQuantity(parseInt(e.currentTarget.value));
    }

    function handleUnitChange(e: React.FormEvent<HTMLInputElement>) {
        setUnit(e.currentTarget.value);
    }

    function handleCommentsChange(e: React.FormEvent<HTMLInputElement>) {
        setComment(e.currentTarget.value);
    }

    return (
        <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: 300}}>
            <label htmlFor="item-search">Item name</label>
            <input type="search" id="item-search"
                list="next-item-list"
                aria-label="Search through master list"
                onChange={handleItemNameChange}
                value={newItemName}
                required></input>

            <datalist id="next-item-list">
                {nextList.map(item => <option key={item} value={item}/>)}
            </datalist>

            <label htmlFor="qty-input">Quantity</label>
            <input type="number"
                id="qty-input"
                aria-label="Quantity"
                min="1"
                required
                onChange={handleQtyChange}
                value={quantity}></input>

            <label htmlFor="unit-input">Unit</label>
            <input type="text"
                id="unit-input"
                list="unit-list"
                aria-label="Unit"
                required
                onChange={handleUnitChange}
                value={unit}></input>

            <datalist id="unit-list">
                {[...Units].map(unit => <option key={unit} value={unit}/>)}
            </datalist>

            <label htmlFor="comments-input">Comments</label>
            <input type="text"
                id="comments-input"
                aria-label="Comments"
                onChange={handleCommentsChange}
                value={comment}></input>
            <br></br>
            <input type="submit" value={existing ? "Modify" : "Add"} onClick={handleNewItem}></input>
        </form>
    );
};

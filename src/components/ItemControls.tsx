import React, { useState } from "react";

export type Item = {
    name: string;
    quantity: number;
    unit: string;
    comment: string;
};

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

    let nextList:string[] = [];
    props.masterList.forEach(masterItem => {
        if (!props.newList.find(item => item.name === masterItem))
            nextList.push(masterItem);
    });

    function handleNewItem(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();

        if (!newItemName || !quantity || !unit)
            return;

        props.setNewList(currList => [...currList, {name: newItemName, quantity, unit, comment}]);
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
    }

    function handleItemNameChange(e: React.FormEvent<HTMLInputElement>) {
        setNewItemName(e.currentTarget.value);
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
                required
                onChange={handleQtyChange}
                value={quantity}></input>

            <label htmlFor="unit-input">Unit</label>
            <input type="text"
                id="unit-input"
                aria-label="Unit"
                required
                onChange={handleUnitChange}
                value={unit}></input>

            <label htmlFor="comments-input">Comments</label>
            <input type="text"
                id="comments-input"
                aria-label="Comments"
                onChange={handleCommentsChange}
                value={comment}></input>
            <br></br>
            <input type="submit" value="Submit" onClick={handleNewItem}></input>
        </form>
    );
};

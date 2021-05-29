import React, { useState } from "react";

type Item = {
    name: string;
    quantity: number;
    unit: string;
    comment: string;
};

function NewList() {
    let [masterList, setMasterList] = useState(new Set<string>(['Cabbage', 'Banana', 'Carrot']));
    let [newList, setNewList] = useState<Item[]>([]);
    let [newItemName, setNewItemName] = useState('');
    let [quantity, setQuantity] = useState(0);
    let [unit, setUnit] = useState('');
    let [comment, setComment] = useState('');

    let nextList:string[] = [];
    masterList.forEach(masterItem => {
        if (!newList.find(item => item.name === masterItem))
            nextList.push(masterItem);
    });

    function handleNewItem(e: React.FormEvent<HTMLInputElement>) {
        if (!newItemName || !quantity || !unit)
            return;

        setNewList(currList => [...currList, {name: newItemName, quantity, unit, comment}]);
        setMasterList(currentSet => {
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

    return (<div>
        <h2>New shopping list</h2>
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

        <div>
            <h2>Debug: Current list</h2>
            <ol>
                {newList.map(item => <li key={item.name}>{item.name}</li>)}
            </ol>
            <h2>Debug: Master list</h2>
            <ol>
                {[...masterList].map(itemName => <li key={itemName}>{itemName}</li>)}
            </ol>
        </div>
    </div>);
}

export default NewList;
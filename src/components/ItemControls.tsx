import React from "react";
import { useContext } from "react";
import { Units } from "../consts/itemConsts";
import { StorageContext } from "../contexts/storage";
import { Item, ItemStatesAndSetters } from '../types/item';

type ItemControlProps = {
    masterList: Set<string>;
    setMasterList: React.Dispatch<React.SetStateAction<Set<string>>>;
    newList: Item[];
    setNewList: React.Dispatch<React.SetStateAction<Item[]>>;
    newItemStatesAndSetters: ItemStatesAndSetters;
};

export function ItemControls(props: ItemControlProps) {
    const storage = useContext(StorageContext)
    let {
        name: newItemName,
        setName: setNewItemName,
        quantity,
        setQuantity,
        unit,
        setUnit,
        comment,
        setComment,
        existing,
        setExisting
    } = props.newItemStatesAndSetters;

    let nextList:string[] = [];
    props.masterList.forEach(masterItem => {
        if (!props.newList.find(item => item.name === masterItem))
            nextList.push(masterItem);
    });

    function handleNewItem(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();

        if (!newItemName || !quantity || !unit)
            return;

        storage.addUpdateMaster({name: newItemName, quantity, unit, comment});
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

    function handleClear() {
        setNewItemName('');
        setQuantity(0);
        setUnit('');
        setComment('');
        setExisting(false);
    }

    return (
        <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            alignContent: "center",
            maxWidth: 400,  marginLeft: 15, padding: 25, background: "#99ccff", borderRadius: 10}}>
            <div className="mb-3">
                <label htmlFor="item-search" className="form-label">Item name</label>
                <input type="search" id="item-search" className="form-control"
                    list="next-item-list"
                    aria-label="Search through master list"
                    onChange={handleItemNameChange}
                    value={newItemName}
                    required></input>
            </div>

            <datalist id="next-item-list">
                {nextList.map(item => <option key={item} value={item}/>)}
            </datalist>

            <div className="mb-3">
                <label htmlFor="qty-input" className="form-label">Quantity</label>
                <input type="number" className="form-control"
                    id="qty-input"
                    aria-label="Quantity"
                    min="1"
                    required
                    onChange={handleQtyChange}
                    value={quantity}></input>
            </div>

            <div className="mb-3">
                <label htmlFor="unit-input" className="form-label">Unit</label>
                <input type="text" className="form-control"
                    id="unit-input"
                    list="unit-list"
                    aria-label="Unit"
                    required
                    onChange={handleUnitChange}
                    value={unit}></input>
            </div>

            <datalist id="unit-list">
                {[...Units].map(unit => <option key={unit} value={unit}/>)}
            </datalist>

            <div className="mb-3">
                <label htmlFor="comments-input" className="form-label">Comments</label>
                <input type="text" className="form-control"
                    id="comments-input"
                    aria-label="Comments"
                    onChange={handleCommentsChange}
                    value={comment}></input>
            </div>
            <br></br>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <input type="submit" value={existing ? "Modify" : "Add"} className="btn btn-primary"
                    onClick={handleNewItem} style={{flexGrow: 0.40}}></input>
                <input type="button" value="Clear" className="btn btn-danger"
                    onClick={handleClear} style={{flexGrow: 0.40}}></input>
            </div>
        </form>
    );
};

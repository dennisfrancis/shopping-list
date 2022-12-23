/* eslint-disable */
import React from "react";
import { useContext } from "react";
import { Categories, Units } from "../consts/itemConsts";
import { StorageContext } from "../contexts/storage";
import { Item, ItemStatesAndSetters } from '../types/item';
import { ItemDisplay } from './ItemDisplay';

import '../styles/itemcontrols.css';

type ItemControlProps = {
    masterList: Set<string>;
    masterItems: Item[];
    setMasterList: React.Dispatch<React.SetStateAction<Set<string>>>;
    newList: Item[];
    setNewList: React.Dispatch<React.SetStateAction<Item[]>>;
    newItemStatesAndSetters: ItemStatesAndSetters;
    searchListVisible: boolean;
    setSearchListVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type ItemSearchListProps = {
    masterList: Set<string>;
    masterItems: Item[];
    newList: Item[];
    newItemStatesAndSetters: ItemStatesAndSetters;
    searchListVisible: boolean;
    setSearchListVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

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
        setExisting,
        date,
        category,
        setCategory,
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

        storage.addUpdate({name: newItemName, quantity, unit, comment, saved: 0, date, category});
        props.setNewList(currList => {
            let matchItemIndex = currList.findIndex((item) => item.name === newItemName);
            if (matchItemIndex === -1) {
                return [...currList, {name: newItemName, quantity, unit, comment, saved: 0, date, category}];
            }

            let listCopy = [...currList];
            let matchItem = listCopy[matchItemIndex];
            matchItem.quantity = quantity;
            matchItem.unit = unit;
            matchItem.comment = comment;
            matchItem.category = category;
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
        setCategory(undefined);
    }

    function handleItemNameChange(e: React.FormEvent<HTMLInputElement>) {
        setNewItemName(e.currentTarget.value);
        let masterItem = props.masterItems.find((item) => item.name === e.currentTarget.value);
        if (masterItem) {
            setQuantity(masterItem.quantity);
            setUnit(masterItem.unit);
            setUnit(masterItem.unit);
            setComment(masterItem.comment);
            setCategory(masterItem.category);
        }
        setExisting(props.newList.findIndex((item) => item.name === e.currentTarget.value) !== -1);
    }

    function handleQtyChange(e: React.FormEvent<HTMLInputElement>) {
        if (e.currentTarget.value === '') {
            setQuantity(0);
            return;
        }
        const qty = parseFloat(e.currentTarget.value);
        setQuantity(Math.round(qty * 10) / 10);
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
        setCategory(undefined);
    }

    function handleCategoryChange(e: React.FormEvent<HTMLInputElement>) {
        setCategory(e.currentTarget.value === '' ? undefined : e.currentTarget.value);
    }

    function handleContextMenu(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        props.setSearchListVisible(true);
    }

    return (
        <form id="item-controls">
            <div className="mb-3">
                <label htmlFor="item-search" className="form-label">Item name</label>
                <input type="search" id="item-search" className="form-control bottom-border-only"
                    list="next-item-list"
                    aria-label="Search through master list"
                    onChange={handleItemNameChange}
                    onContextMenu={handleContextMenu}
                    value={newItemName}
                    required></input>
            </div>

            <datalist id="next-item-list">
                {nextList.map(item => <option key={item} value={item}/>)}
            </datalist>

            <div className="mb-3">
                <label htmlFor="qty-input" className="form-label">Quantity</label>
                <input type="number" className="form-control bottom-border-only"
                    id="qty-input"
                    aria-label="Quantity"
                    min={1}
                    required
                    onChange={handleQtyChange}
                    value={quantity === 0 ? '' : (quantity + '')}></input>
            </div>

            <div className="mb-3">
                <label htmlFor="unit-input" className="form-label">Unit</label>
                <input type="text" className="form-control bottom-border-only"
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
                <input type="text" className="form-control bottom-border-only"
                    id="comments-input"
                    aria-label="Comments"
                    onChange={handleCommentsChange}
                    value={comment}></input>
            </div>

            <div className="mb-3">
                <label htmlFor="category-input" className="form-label">Category</label>
                <input type="text" className="form-control bottom-border-only"
                    id="category-input"
                    list="category-list"
                    aria-label="Unit"
                    required
                    onChange={handleCategoryChange}
                    value={category === undefined ? '' : category}></input>
            </div>

            <datalist id="category-list">
                {[...Categories].map(cat => <option key={cat} value={cat}/>)}
            </datalist>

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

export function ItemSearchList(props: ItemSearchListProps) {

    let itemDisplayList: JSX.Element[] = [];
    props.masterItems.forEach(masterItem => {
        itemDisplayList.push(
            <ItemDisplay
                key={masterItem.name}
                item={masterItem}
                newItemStatesAndSetters={props.newItemStatesAndSetters}
                disabled={!!props.newList.find(item => item.name === masterItem.name)}
                setSearchListVisible={props.setSearchListVisible}/>
        );
    });

    return (
        <div id="item-search-list" style={{height: "calc(100vh - 220px)", overflowY:"scroll"}}>
            { itemDisplayList }
        </div>
    );
}

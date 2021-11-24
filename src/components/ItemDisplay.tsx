/* eslint-disable */
import React from 'react';
import { Item, ItemStatesAndSetters } from "../types/item";

export function ItemDisplay(props: {
    item: Item,
    newItemStatesAndSetters?: ItemStatesAndSetters,
    removeItem?: (x: Item) => void
}) {
    const handleItemClick = () => {
        if (!props.newItemStatesAndSetters)
            return;

        props.newItemStatesAndSetters.setName(props.item.name);
        props.newItemStatesAndSetters.setQuantity(props.item.quantity);
        props.newItemStatesAndSetters.setUnit(props.item.unit);
        props.newItemStatesAndSetters.setComment(props.item.comment);
        props.newItemStatesAndSetters.setExisting(true);
        props.newItemStatesAndSetters.setCategory(props.item.category);
    };

    let selected = props.newItemStatesAndSetters ? (props.newItemStatesAndSetters.name === props.item.name) : false;
    const removeItem = () => {
        if (props.removeItem)
            props.removeItem(props.item);
    };
    return (
        <li className={"list-group-item d-flex justify-content-between align-items-start" + (selected ? " active" : "")}>
            <div className="ms-2 me-auto" style={{width: "100vw"}} onClick={handleItemClick}>
                <div className="fw-bold" style={{display: "inline"}}>{props.item.name + (props.item.comment ? ' (' + props.item.comment + ')' : '')}</div>
                <div>{props.item.quantity}&nbsp;{props.item.unit}&nbsp;
                    { (props.item.category !== undefined) && <small style={{fontStyle: "italic", color: "red"}}>{'#' + props.item.category}</small> }</div>
            </div>
            {props.removeItem && <button type="button" className={(selected ? "btn-close btn-close-white" : "btn-close")} aria-label="Close" onClick={removeItem}></button>}
        </li>
    );
}
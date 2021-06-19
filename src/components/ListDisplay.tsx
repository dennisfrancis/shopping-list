import React from "react";
import { Item } from '../types/item';

export function ListDisplay(props: {
    date: number,
    items: Item[],
    selected: boolean;
    setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
}) {
    const handleListClick = () => {
        props.setSelectedDate(props.date);
    };

    const removeList = () => {
        // TODO: remove from items from db and re-fetch.
    };

    return (
        <li className={"list-group-item d-flex justify-content-between align-items-start" + (props.selected ? " active" : "")}>
            <div className="ms-2 me-auto" style={{width: "100vw"}} onClick={handleListClick}>
                <div className="fw-bold" style={{display: "inline"}}>{new Date(props.date).toLocaleString()}</div>
                <div>{props.items.length}&nbsp;items</div>
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={removeList}></button>
        </li>
    );
}
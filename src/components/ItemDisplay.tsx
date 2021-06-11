import React from 'react';
import { Item, ItemStatesAndSetters } from "../types/item";

export function ItemDisplay(props: {
    item: Item,
    newItemStatesAndSetters: ItemStatesAndSetters
}) {
    const itemStyle: React.CSSProperties = {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'};

    itemStyle.background = (props.newItemStatesAndSetters.name === props.item.name) ? '#00bfff' : '#ffffff';

    const handleItemClick = () => {
        props.newItemStatesAndSetters.setName(props.item.name);
        props.newItemStatesAndSetters.setQuantity(props.item.quantity);
        props.newItemStatesAndSetters.setUnit(props.item.unit);
        props.newItemStatesAndSetters.setComment(props.item.comment);
        props.newItemStatesAndSetters.setExisting(true);
    };
    return (
        <div style={itemStyle} onClick={handleItemClick}>
            <div>{props.item.name}</div>
            { props.item.comment && <div>({props.item.comment})</div> }
            <div>{props.item.quantity}&nbsp;{props.item.unit}</div>
        </div>
    );
}
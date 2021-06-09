import { Item, ItemStatesAndSetters } from "../types/item";

export function ItemDisplay(props: {
    item: Item,
    newItemStatesAndSetters: ItemStatesAndSetters
}) {
    const handleItemClick = () => {
        props.newItemStatesAndSetters.setName(props.item.name);
        props.newItemStatesAndSetters.setQuantity(props.item.quantity);
        props.newItemStatesAndSetters.setUnit(props.item.unit);
        props.newItemStatesAndSetters.setComment(props.item.comment);
        props.newItemStatesAndSetters.setExisting(true);
    };
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} onClick={handleItemClick}>
            <div>{props.item.name}</div>
            { props.item.comment && <div>({props.item.comment})</div> }
            <div>{props.item.quantity}&nbsp;{props.item.unit}</div>
        </div>
    );
}
import { Item } from "../types/item";

export function ItemDisplay(props: {
    item: Item
}) {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div>{props.item.name}</div>
            { props.item.comment && <div>({props.item.comment})</div> }
            <div>{props.item.quantity}&nbsp;{props.item.unit}</div>
        </div>
    );
}
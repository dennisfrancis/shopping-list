import { Item } from "./ItemControls";

export function DebugItemLists(props: {
    masterList: Set<string>;
    newList: Item[];
}) {
    return (
        <div>
            <h2>Debug: Current list</h2>
            <ol>
                {props.newList.map(item => <li key={item.name}>{item.name}</li>)}
            </ol>
            <h2>Debug: Master list</h2>
            <ol>
                {[...props.masterList].map(itemName => <li key={itemName}>{itemName}</li>)}
            </ol>
        </div>
    );
}
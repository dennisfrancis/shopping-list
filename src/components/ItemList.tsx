import { useContext } from "react";
import { Item, ItemStatesAndSetters } from '../types/item';
import { ItemDisplay } from '../components/ItemDisplay';
import { StorageContext } from '../contexts/storage';

export function ItemList(props: {
    newList: Item[],
    newItemStatesAndSetters: ItemStatesAndSetters,
    removeItem: (x: Item) => void,
    setRunFetchEffect: (flag: boolean) => void
}) {

    const storage = useContext(StorageContext);

    const clearNewItemControls = () => {
        props.newItemStatesAndSetters.setName('');
        props.newItemStatesAndSetters.setQuantity(0);
        props.newItemStatesAndSetters.setUnit('');
        props.newItemStatesAndSetters.setComment('');
        props.newItemStatesAndSetters.setExisting(false);
    };

    const handleClear = () => {
        if (props.newList.length === 0)
            return;

        storage.clearUnsaved()?.then(() => {
            clearNewItemControls();
            props.setRunFetchEffect(true);
        })
    };

    const handleSave = () => {
        if (props.newList.length === 0)
            return;

        const saveDate = new Date();
        storage.saveUnsaved(saveDate)?.then(() => {
            clearNewItemControls();
            props.setRunFetchEffect(true);
        })
    };

    return (
        <div style={{marginLeft: 20, width: '100%', maxWidth: 400}}>
            <p>Shopping list({props.newList.length})</p>
            <ol className="list-group list-group-numbered" style={{maxHeight: "80vh", overflowY:"auto"}}>
                {props.newList.map(item =>
                    <ItemDisplay item={item} key={item.name}
                        newItemStatesAndSetters={props.newItemStatesAndSetters}
                        removeItem={props.removeItem}/>)}
            </ol>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                <input type="button" value="Save" className="btn btn-primary"
                    onClick={handleSave} style={{flexGrow: 0.40}} disabled={props.newList.length === 0}></input>
                <input type="button" value="Clear" className="btn btn-danger"
                    onClick={handleClear} style={{flexGrow: 0.40}} disabled={props.newList.length === 0}></input>
            </div>
        </div>
    );
}
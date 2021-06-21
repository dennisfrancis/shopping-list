import { useContext, useState } from "react";
import { Item, ItemStatesAndSetters } from '../types/item';
import { ItemDisplay } from '../components/ItemDisplay';
import { StorageContext } from '../contexts/storage';

const itemListToText = (list: Item[]): string => {
    let itemsText: string[] = [`${list[0].date.toLocaleDateString()}`, `${list.length} items`, ''];
    list.forEach((item, index) => {
        let commentString = item.comment ? ` (${item.comment})` : '';
        itemsText.push(`${index + 1}. ${item.name}${commentString} : ${item.quantity} ${item.unit}`);
    });

    return itemsText.join('\n');
}

export function ItemList(props: {
    list: Item[],
    copyList?: boolean,
    removeItem?: ((x: Item) => void),
    newItemStatesAndSetters?: ItemStatesAndSetters
}) {

    let [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(itemListToText(props.list))
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000);
            });
    };

    return (
        <div>
            <ol className="list-group list-group-numbered" style={{maxHeight: "80vh", overflowY:"auto"}}>
                {props.list.map(item =>
                    <ItemDisplay item={item} key={item.name}
                        newItemStatesAndSetters={props.newItemStatesAndSetters}
                        removeItem={props.removeItem}/>)}
            </ol>
            <br/>
            {
                props.copyList && props.list.length > 0 &&
                <input type="button" value={copied ? 'Copied!' : 'Copy list'} className={"btn " + (copied ? "btn-success" : "btn-primary")}
                    onClick={handleCopy}/>
            }
        </div>
    );
}

export function NewItemList(props: {
    list: Item[],
    removeItem: (x: Item) => void,
    newItemStatesAndSetters: ItemStatesAndSetters,
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
        if (props.list.length === 0)
            return;

        storage.clearUnsaved()?.then(() => {
            clearNewItemControls();
            props.setRunFetchEffect(true);
        })
    };

    const handleSave = () => {
        if (props.list.length === 0)
            return;

        const saveDate = new Date();
        storage.saveUnsaved(saveDate)?.then(() => {
            clearNewItemControls();
            props.setRunFetchEffect(true);
        });

        navigator.clipboard.writeText(itemListToText(props.list));
    };

    return (
        <div style={{marginLeft: 20, width: '100%', maxWidth: 400}}>
            <p>Shopping list({props.list.length})</p>
            <ItemList list={props.list} newItemStatesAndSetters={props.newItemStatesAndSetters}
                removeItem={props.removeItem}/>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                <input type="button" value="Save and Copy" className="btn btn-primary"
                    onClick={handleSave} style={{flexGrow: 0.40}} disabled={props.list.length === 0}></input>
                <input type="button" value="Clear" className="btn btn-danger"
                    onClick={handleClear} style={{flexGrow: 0.40}} disabled={props.list.length === 0}></input>
            </div>
        </div>
    );
}
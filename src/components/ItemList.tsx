/* eslint-disable */
import { useContext, useState } from "react";
import { Item, ItemStatesAndSetters, cloneItem } from '../types/item';
import ItemDisplay from '../components/ItemDisplay';
import { StorageContext } from '../contexts/storage';
import { useHistory } from 'react-router-dom';

import '../styles/newitemlist.css';

const itemListToText = (list: Item[]): string => {
    let message = window.localStorage.getItem('settings_message');
    let itemsText: string[] = !message ? [`${list[0].date.toLocaleDateString()}`, `${list.length} items`, ''] :
        [message, ''];

    let sublists = new Map<string, Item[]>();
    const cat2String = (category: string | undefined) => category === undefined ? '' : category;
    list.forEach(item => {
        const cat = cat2String(item.category);
        const sub = sublists.get(cat);
        if (sub)
            sub.push(item);
        else
            sublists.set(cat, [item]);
    });

    let categories = [...sublists.keys()];
    categories.sort();

    categories.forEach((cat: string) => {
        if (cat === '') {
            itemsText.push('');
        } else {
            itemsText.push('');
            itemsText.push(cat);
            itemsText.push('='.repeat(cat.length));
        }

        const items = sublists.get(cat) as Item[];
        items.forEach((item, index) => {
            let commentString = item.comment ? ` (${item.comment})` : '';
            itemsText.push(`${index + 1}. ${item.name}${commentString} : ${item.quantity} ${item.unit}`);
        });
    });

    return itemsText.join('\n');
}

export function ItemList(props: {
    list: Item[],
    copyList?: boolean,
    removeItem?: ((x: Item) => void),
    newItemStatesAndSetters?: ItemStatesAndSetters,
    setNewList?: React.Dispatch<React.SetStateAction<Item[]>>,
    date?: Date
}) {

    let [copied, setCopied] = useState(false);
    const storage = useContext(StorageContext);
    let history = useHistory();

    const handleCopy = () => {
        navigator.clipboard.writeText(itemListToText(props.list))
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000);
            });
    };

    const handleNewListFrom = function(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();

        if (!props.setNewList) {
            return;
        }

        props.setNewList(currList => {
            if (!props.list) {
                return currList;
            }

            let newDate = props.date || new Date();

            let outMap = new Map<string, Item>();
            currList.forEach((item) => {
                outMap.set(item.name, item);
            });

            props.list.forEach((item) => {
                item = cloneItem(item);
                item.saved = 0;
                item.date = newDate;
                outMap.set(item.name, item);
            });

            let outList: Item[] = [];
            outMap.forEach((item) => {
                outList.push(item);
                storage.addUpdate(item);
            });

            return outList;
        });

        history.push('/');
    }

    return (
        <div style={{height: "calc(100vh - 220px)"}}>
            <ol className="list-group list-group-flush list-group-numbered" style={{height: "100%", overflowY:"auto"}}>
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
            {
                props.setNewList && props.date && props.list.length > 0 &&
                <input type="button" value="Create new list" className="btn btn-primary"
                    onClick={handleNewListFrom}/>
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
        props.newItemStatesAndSetters.setCategory(undefined);
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
        <div id="new-item-list-wrapper">
            <p>Shopping list({props.list.length})</p>
            <ItemList list={props.list} newItemStatesAndSetters={props.newItemStatesAndSetters}
                removeItem={props.removeItem}/>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 25}}>
                <input type="button" value="Save and Copy" className="btn btn-primary"
                    onClick={handleSave} style={{flexGrow: 0.40}} disabled={props.list.length === 0}></input>
                <input type="button" value="Clear" className="btn btn-danger"
                    onClick={handleClear} style={{flexGrow: 0.40}} disabled={props.list.length === 0}></input>
            </div>
        </div>
    );
}
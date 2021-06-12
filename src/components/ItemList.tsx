import { Item, ItemStatesAndSetters } from '../types/item';
import { ItemDisplay } from '../components/ItemDisplay';

export function ItemList(props: {
    newList: Item[],
    newItemStatesAndSetters: ItemStatesAndSetters,
    removeItem: (x: Item) => void
}) {
    return (
        <div style={{marginLeft: 20, width: '100%', maxWidth: 400}}>
            <p>Shopping list({props.newList.length})</p>
            <ol className="list-group list-group-numbered" style={{height: "80vh", overflowY:"auto"}}>
                {props.newList.map(item =>
                    <ItemDisplay item={item} key={item.name}
                        newItemStatesAndSetters={props.newItemStatesAndSetters}
                        removeItem={props.removeItem}/>)}
            </ol>
        </div>
    );
}
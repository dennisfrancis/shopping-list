import { Item, ItemStatesAndSetters } from '../types/item';
import { ItemDisplay } from '../components/ItemDisplay';

export function ItemList(props: {newList: Item[], newItemStatesAndSetters: ItemStatesAndSetters}) {
    return (
        <div style={{marginLeft: 20, width: '100%', maxWidth: 400}}>
            <p>Shopping list({props.newList.length})</p>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {props.newList.map(item => <ItemDisplay item={item} key={item.name} newItemStatesAndSetters={props.newItemStatesAndSetters}/>)}
            </div>
        </div>
    );
}
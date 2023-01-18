import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Item, ItemStatesAndSetters, cloneItem } from '../types/item';
import ItemDisplay from './ItemDisplay';
import { StorageContext } from '../contexts/storage';

import '../styles/newitemlist.css';

const itemListToText = (list: Item[]): string => {
  const message = window.localStorage.getItem('settings_message');
  const itemsText: string[] = !message ? [`${list[0].date.toLocaleDateString()}`, `${list.length} items`, ''] :
    [message, ''];

  const sublists = new Map<string, Item[]>();
  function cat2String(category: string | undefined) {
    return category === undefined ? '' : category;
  }
  list.forEach((item) => {
    const cat = cat2String(item.category);
    const sub = sublists.get(cat);
    if (sub) sub.push(item);
    else sublists.set(cat, [item]);
  });

  const categories = [...sublists.keys()];
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
      const commentString = item.comment ? ` (${item.comment})` : '';
      itemsText.push(`${index + 1}. ${item.name}${commentString} : ${item.quantity} ${item.unit}`);
    });
  });

  return itemsText.join('\n');
};

export function ItemList(props: {
  list: Item[],
  copyList?: boolean,
  // eslint-disable-next-line no-unused-vars
  removeItem?: ((x: Item) => void),
  newItemStatesAndSetters?: ItemStatesAndSetters,
  setNewList?: React.Dispatch<React.SetStateAction<Item[]>>,
  date?: Date
}) {
  const [copied, setCopied] = useState(false);
  const storage = useContext(StorageContext);
  const history = useHistory();
  const {
    copyList, list, setNewList, date, newItemStatesAndSetters, removeItem,
  } = props;

  const handleCopy = () => {
    navigator.clipboard.writeText(itemListToText(list))
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      });
  };

  function handleNewListFrom(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    if (!setNewList) {
      return;
    }

    setNewList((currList) => {
      if (!list) {
        return currList;
      }

      const newDate = date || new Date();

      const outMap = new Map<string, Item>();
      currList.forEach((item) => {
        outMap.set(item.name, item);
      });

      list.forEach((item) => {
        let item1 = item;
        item1 = cloneItem(item1);
        item1.saved = 0;
        item1.date = newDate;
        outMap.set(item1.name, item1);
      });

      const outList: Item[] = [];
      outMap.forEach((item) => {
        outList.push(item);
        storage.addUpdate(item);
      });

      return outList;
    });

    history.push('/');
  }

  return (
    <div style={{ height: 'calc(100vh - 220px)' }}>
      <ol className="list-group list-group-flush list-group-numbered" style={{ height: '100%', overflowY: 'auto' }}>
        {list.map((item) => (
          <ItemDisplay
            item={item}
            key={item.name}
            newItemStatesAndSetters={newItemStatesAndSetters}
            removeItem={removeItem}
          />
        ))}
      </ol>
      <br />
      {
        copyList && list.length > 0 && (
          <input
            type="button"
            value={copied ? 'Copied!' : 'Copy list'}
            className={`btn ${(copied ? 'btn-success' : 'btn-primary')}`}
            onClick={handleCopy}
          />
        )
      }
      {
        setNewList && date && list.length > 0 && (
          <input
            type="button"
            value="Create new list"
            className="btn btn-primary"
            onClick={handleNewListFrom}
          />
        )
      }
    </div>
  );
}

export function NewItemList(props: {
  list: Item[],
  // eslint-disable-next-line no-unused-vars
  removeItem: (x: Item) => void,
  newItemStatesAndSetters: ItemStatesAndSetters,
  // eslint-disable-next-line no-unused-vars
  setRunFetchEffect: (flag: boolean) => void
}) {
  const storage = useContext(StorageContext);
  const {
    list, newItemStatesAndSetters, setRunFetchEffect, removeItem,
  } = props;

  const clearNewItemControls = () => {
    newItemStatesAndSetters.setName('');
    newItemStatesAndSetters.setQuantity(0);
    newItemStatesAndSetters.setUnit('');
    newItemStatesAndSetters.setComment('');
    newItemStatesAndSetters.setExisting(false);
    newItemStatesAndSetters.setCategory(undefined);
  };

  const handleClear = () => {
    if (list.length === 0) return;

    storage.clearUnsaved()?.then(() => {
      clearNewItemControls();
      setRunFetchEffect(true);
    });
  };

  const handleSave = () => {
    if (list.length === 0) return;

    const saveDate = new Date();
    storage.saveUnsaved(saveDate)?.then(() => {
      clearNewItemControls();
      setRunFetchEffect(true);
    });

    navigator.clipboard.writeText(itemListToText(list));
  };

  return (
    <div id="new-item-list-wrapper">
      <p>
        Shopping list(
        {list.length}
        )
      </p>
      <ItemList
        list={list}
        newItemStatesAndSetters={newItemStatesAndSetters}
        removeItem={removeItem}
      />
      <div style={
        {
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25,
        }
      }
      >
        <input
          type="button"
          value="Save and Copy"
          className="btn btn-primary"
          onClick={handleSave}
          style={{ flexGrow: 0.40 }}
          disabled={list.length === 0}
        />
        <input
          type="button"
          value="Clear"
          className="btn btn-danger"
          onClick={handleClear}
          style={{ flexGrow: 0.40 }}
          disabled={list.length === 0}
        />
      </div>
    </div>
  );
}

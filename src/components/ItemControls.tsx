import React, { useContext, useLayoutEffect, useRef } from 'react';
import { Categories, Units } from '../consts/itemConsts';
import { StorageContext } from '../contexts/storage';
import { Item, ItemStatesAndSetters } from '../types/item';
import { ItemDisplay } from './ItemDisplay';

import '../styles/itemcontrols.css';

type ItemControlProps = {
  masterList: Set<string>;
  masterItems: Item[];
  setMasterList: React.Dispatch<React.SetStateAction<Set<string>>>;
  newList: Item[];
  setNewList: React.Dispatch<React.SetStateAction<Item[]>>;
  newItemStatesAndSetters: ItemStatesAndSetters;
  setSearchListVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type ItemSearchListProps = {
  masterItems: Item[];
  newList: Item[];
  newItemStatesAndSetters: ItemStatesAndSetters;
  setSearchListVisible: React.Dispatch<React.SetStateAction<boolean>>;
  searchYPosition: number;
  setSearchYPosition: React.Dispatch<React.SetStateAction<number>>;
}

export function ItemControls(props: ItemControlProps) {
  const storage = useContext(StorageContext);
  const {
    newItemStatesAndSetters,
    masterList,
    newList,
    setNewList,
    setMasterList,
    masterItems,
    setSearchListVisible,
  } = props;

  const {
    name: newItemName,
    setName: setNewItemName,
    quantity,
    setQuantity,
    unit,
    setUnit,
    comment,
    setComment,
    existing,
    setExisting,
    date,
    category,
    setCategory,
  } = newItemStatesAndSetters;

  const nextList: string[] = [];
  masterList.forEach((masterItem) => {
    if (!newList.find((item) => item.name === masterItem)) {
      nextList.push(masterItem);
    }
  });

  function handleNewItem(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    if (!newItemName || !quantity || !unit) return;

    storage.addUpdate({
      name: newItemName,
      quantity,
      unit,
      comment,
      saved: 0,
      date,
      category,
    });
    setNewList((currList) => {
      const matchItemIndex = currList.findIndex((item) => item.name === newItemName);
      if (matchItemIndex === -1) {
        return [
          ...currList,
          {
            name: newItemName,
            quantity,
            unit,
            comment,
            saved: 0,
            date,
            category,
          },
        ];
      }

      const listCopy = [...currList];
      const matchItem = listCopy[matchItemIndex];
      matchItem.quantity = quantity;
      matchItem.unit = unit;
      matchItem.comment = comment;
      matchItem.category = category;
      return listCopy;
    });

    setMasterList((currentSet) => {
      if (currentSet.has(newItemName)) {
        return currentSet;
      }
      const newSet = new Set<string>(currentSet);
      newSet.add(newItemName);
      return newSet;
    });
    setNewItemName('');
    setQuantity(0);
    setUnit('');
    setComment('');
    setExisting(false);
    setCategory(undefined);
  }

  function handleItemNameChange(e: React.FormEvent<HTMLInputElement>) {
    setNewItemName(e.currentTarget.value);
    const masterItem = masterItems.find((item) => item.name === e.currentTarget.value);
    if (masterItem) {
      setQuantity(masterItem.quantity);
      setUnit(masterItem.unit);
      setUnit(masterItem.unit);
      setComment(masterItem.comment);
      setCategory(masterItem.category);
    }
    setExisting(newList.findIndex((item) => item.name === e.currentTarget.value) !== -1);
  }

  function handleQtyChange(e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.value === '') {
      setQuantity(0);
      return;
    }
    const qty = parseFloat(e.currentTarget.value);
    setQuantity(Math.round(qty * 10) / 10);
  }

  function handleUnitChange(e: React.FormEvent<HTMLInputElement>) {
    setUnit(e.currentTarget.value);
  }

  function handleCommentsChange(e: React.FormEvent<HTMLInputElement>) {
    setComment(e.currentTarget.value);
  }

  function handleClear() {
    setNewItemName('');
    setQuantity(0);
    setUnit('');
    setComment('');
    setExisting(false);
    setCategory(undefined);
  }

  function handleCategoryChange(e: React.FormEvent<HTMLInputElement>) {
    setCategory(e.currentTarget.value === '' ? undefined : e.currentTarget.value);
  }

  function handleContextMenu(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchListVisible(true);
  }

  return (
    <form id="item-controls">
      <div className="mb-3">
        <label htmlFor="item-search" className="form-label">Item name</label>
        <input
          type="search"
          id="item-search"
          className="form-control bottom-border-only"
          list="next-item-list"
          aria-label="Search through master list"
          onChange={handleItemNameChange}
          onContextMenu={handleContextMenu}
          value={newItemName}
          required
        />
      </div>

      <label htmlFor="next-item-list" className="form-label">
        <datalist id="next-item-list">
          {nextList.map((item) => <option key={item} value={item} aria-label={item} />)}
        </datalist>
      </label>

      <div className="mb-3">
        <label htmlFor="qty-input" className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control bottom-border-only"
          id="qty-input"
          aria-label="Quantity"
          min={1}
          required
          onChange={handleQtyChange}
          value={quantity === 0 ? '' : (quantity.toString())}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="unit-input" className="form-label">Unit</label>
        <input
          type="text"
          className="form-control bottom-border-only"
          id="unit-input"
          list="unit-list"
          aria-label="Unit"
          required
          onChange={handleUnitChange}
          value={unit}
        />
      </div>

      <datalist id="unit-list">
        {[...Units].map(
          (thisUnit) => <option key={thisUnit} value={thisUnit} aria-label={thisUnit} />,
        )}
      </datalist>

      <div className="mb-3">
        <label htmlFor="comments-input" className="form-label">Comments</label>
        <input
          type="text"
          className="form-control bottom-border-only"
          id="comments-input"
          aria-label="Comments"
          onChange={handleCommentsChange}
          value={comment}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category-input" className="form-label">Category</label>
        <input
          type="text"
          className="form-control bottom-border-only"
          id="category-input"
          list="category-list"
          aria-label="Unit"
          required
          onChange={handleCategoryChange}
          value={category === undefined ? '' : category}
        />
      </div>

      <datalist id="category-list">
        {[...Categories].map((cat) => <option key={cat} value={cat} aria-label={cat} />)}
      </datalist>

      <br />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <input
          type="submit"
          value={existing ? 'Modify' : 'Add'}
          className="btn btn-primary"
          onClick={handleNewItem}
          style={{ flexGrow: 0.40 }}
        />
        <input
          type="button"
          value="Clear"
          className="btn btn-danger"
          onClick={handleClear}
          style={{ flexGrow: 0.40 }}
        />
      </div>
    </form>
  );
}

export function ItemSearchList(props: ItemSearchListProps) {
  const itemListDiv = useRef<HTMLDivElement>(null);
  const {
    searchYPosition,
    setSearchYPosition,
    masterItems,
    newItemStatesAndSetters,
    newList,
    setSearchListVisible,
  } = props;
  useLayoutEffect(() => {
    if (itemListDiv.current) {
      itemListDiv.current.scrollTop = searchYPosition;
    }
  });

  const itemDisplayList: JSX.Element[] = [];
  masterItems.forEach((masterItem) => {
    itemDisplayList.push(
      <ItemDisplay
        key={masterItem.name}
        item={masterItem}
        newItemStatesAndSetters={newItemStatesAndSetters}
        disabled={!!newList.find((item) => item.name === masterItem.name)}
        setSearchListVisible={setSearchListVisible}
      />,
    );
  });

  function handleScroll(e: React.UIEvent) {
    setSearchYPosition(e.currentTarget.scrollTop);
  }

  return (
    <div
      id="item-search-list"
      ref={itemListDiv}
      style={{ height: 'calc(100vh - 220px)', overflowY: 'scroll' }}
      onScroll={handleScroll}
    >
      {itemDisplayList}
    </div>
  );
}

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Item, ItemStatesAndSetters } from '../types/item';

export default function ItemDisplay(props: {
  item: Item,
  newItemStatesAndSetters?: ItemStatesAndSetters,
  // eslint-disable-next-line no-unused-vars
  removeItem?: (x: Item) => void,
  disabled?: boolean,
  setSearchListVisible?: React.Dispatch<React.SetStateAction<boolean>>,
}) {
  const {
    disabled,
    newItemStatesAndSetters,
    item,
    setSearchListVisible,
    removeItem,
  } = props;
  const handleItemClick = () => {
    if (disabled) return;

    if (!newItemStatesAndSetters) return;

    newItemStatesAndSetters.setName(item.name);
    newItemStatesAndSetters.setQuantity(item.quantity);
    newItemStatesAndSetters.setUnit(item.unit);
    newItemStatesAndSetters.setComment(item.comment);
    newItemStatesAndSetters.setExisting(true);
    newItemStatesAndSetters.setCategory(item.category);

    if (setSearchListVisible) {
      setSearchListVisible(false); // Hide search list
      if (newItemStatesAndSetters) {
        newItemStatesAndSetters.setExisting(false);
      }
    }
  };

  const selected = newItemStatesAndSetters ?
    (newItemStatesAndSetters.name === item.name) : false;
  const localRemoveItem = () => {
    if (removeItem) removeItem(item);
  };

  const text = item.name + (item.comment ? ` (${item.comment})` : '');
  return (
    <li className={`list-group-item d-flex justify-content-between align-items-start${(selected ? ' active' : '')}${(disabled ? ' disabled' : '')}`}>

      { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */ }
      <div className="ms-2 me-auto" style={{ width: '100vw' }} onClick={handleItemClick}>
        <div className="fw-bold" style={{ display: 'inline' }}>{text}</div>
        <div>
          {item.quantity}
          &nbsp;
          {item.unit}
          &nbsp;
          {(item.category !== undefined)
            && <small style={{ fontStyle: 'italic', color: 'red' }}>{`#${item.category}`}</small>}
        </div>
      </div>
      {removeItem && <button type="button" className={(selected ? 'btn-close btn-close-white' : 'btn-close')} aria-label="Close" onClick={localRemoveItem} />}
    </li>
  );
}

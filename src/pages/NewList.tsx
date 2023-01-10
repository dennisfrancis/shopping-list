import React, { useContext, useState } from 'react';
import { Item, ItemStatesAndSetters } from '../types/item';
import { ItemControls, ItemSearchList } from '../components/ItemControls';
import DebugItemLists from '../components/DebugItemLists';
import { NewItemList } from '../components/ItemList';
import { StorageContext } from '../contexts/storage';

import '../styles/newlist.css';

export default function NewList(props: {
  masterList: Set<string>;
  masterItems: Item[];
  setMasterList: React.Dispatch<React.SetStateAction<Set<string>>>;
  newList: Item[];
  setNewList: React.Dispatch<React.SetStateAction<Item[]>>;
  newItemStatesAndSetters: ItemStatesAndSetters;
  setRunFetchEffect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const storage = useContext(StorageContext);
  const {
    newItemStatesAndSetters, newList, setNewList,
    masterList, masterItems, setMasterList,
    setRunFetchEffect,
  } = props;
  const {
    name,
    setName,
    setQuantity,
    setUnit,
    setComment,
    setExisting,
    setCategory,
  } = newItemStatesAndSetters;

  const [searchListVisible, setSearchListVisible] = useState<boolean>(false);
  const [searchYPosition, setSearchYPosition] = useState<number>(0);

  const removeItem = (item: Item) => {
    const nameToRemove = item.name;
    const list = newList.filter((oldItem) => oldItem.name !== nameToRemove);
    storage.delete(item);
    setNewList(list);
    if (name === nameToRemove) {
      setName('');
      setQuantity(0);
      setUnit('');
      setComment('');
      setExisting(false);
      setCategory(undefined);
    }
  };

  const debugMode = false;

  return (
    <div id="newlist-wrapper">
      {(searchListVisible ?
        (
          <ItemSearchList
            masterItems={masterItems}
            masterList={masterList}
            newList={newList}
            newItemStatesAndSetters={newItemStatesAndSetters}
            searchListVisible={searchListVisible}
            setSearchListVisible={setSearchListVisible}
            searchYPosition={searchYPosition}
            setSearchYPosition={setSearchYPosition}
          />
        ) :
        (
          <ItemControls
            masterList={masterList}
            setMasterList={setMasterList}
            newList={newList}
            setNewList={setNewList}
            masterItems={masterItems}
            newItemStatesAndSetters={newItemStatesAndSetters}
            searchListVisible={searchListVisible}
            setSearchListVisible={setSearchListVisible}
          />
        )
      )}

      <div className="sepline" />
      <NewItemList
        list={newList}
        newItemStatesAndSetters={newItemStatesAndSetters}
        removeItem={removeItem}
        setRunFetchEffect={setRunFetchEffect}
      />
      {debugMode && <DebugItemLists masterList={masterList} newList={newList} />}
      <br />
    </div>
  );
}

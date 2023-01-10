import React from 'react';
import { Item } from '../types/item';

export default function DebugItemLists(props: {
  masterList: Set<string>;
  newList: Item[];
}) {
  const { newList, masterList } = props;
  return (
    <div>
      <h2>Debug: Current list</h2>
      <ol>
        {newList.map((item) => <li key={item.name}>{item.name}</li>)}
      </ol>
      <h2>Debug: Master list</h2>
      <ol>
        {[...masterList].map((itemName) => <li key={itemName}>{itemName}</li>)}
      </ol>
    </div>
  );
}

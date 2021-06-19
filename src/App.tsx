import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './bootstrap.min.css';
import { useState } from "react";
import { Item, ItemStatesAndSetters } from './types/item';
import { useEffect } from "react";


import { NewList } from './pages/NewList';
import UserData from './pages/UserData';
import { openDb } from './storage/storageDefs';
import { StorageType, StorageProvider } from './contexts/storage';

let storage = new StorageType();

(function() {
    openDb(indexedDB).then((db) => {
      storage.setDB(db);
      storage.fetch();
    });
})();

function App() {
  let [masterList, setMasterList] = useState(new Set<string>([]));
  let [dbIsEmpty, setDBIsEmpty] = useState(false);
  let [masterItems, setMasterItems] = useState([] as Item[]);
  let [newList, setNewList] = useState<Item[]>([]);
  let [name, setName] = useState('');
  let [quantity, setQuantity] = useState(0);
  let [unit, setUnit] = useState('');
  let [comment, setComment] = useState('');
  let [date, setDate] = useState(new Date());
  let [existing, setExisting] = useState(false);
  let [runFetchEffect, setRunFetchEffect] = useState(false);
  let itemStatesAndSetters: ItemStatesAndSetters = {
      name,
      setName,
      quantity,
      setQuantity,
      unit,
      setUnit,
      comment,
      setComment,
      existing,
      setExisting,
      date,
      setDate
  };

  // fetch initial state from DB.
  useEffect(() => {
      if (!runFetchEffect && (masterList.size || dbIsEmpty)) {
          return;
      }

      if (storage.hasDB()) {
          // console.log('Fetching...');
          storage.fetch();
      }

      const dbListener = (mList: Item[]) => {
          if (runFetchEffect)
              setRunFetchEffect(false);
          setDBIsEmpty((mList.length === 0));
          setMasterList(new Set<string>(mList.map(item => item.name)));
          const nameToItem = new Map<string, Item>();
          const currentList: Item[] = [];
          mList.forEach((item) => {
              if (!item.saved)
                  currentList.push(item);

              let prevItem = nameToItem.get(item.name);
              if (!prevItem)
                  nameToItem.set(item.name, item);
              else if (prevItem.date < item.date)
                  nameToItem.set(item.name, item);
          });
          setMasterItems([...nameToItem.values()]);
          setNewList(currentList);
          if (currentList.length) {
              setDate(currentList[0].date);
          }
      };
      storage.addListener(dbListener);

      return function cleanup() {
          storage.removeListener(dbListener);
      };
  });

  return (
    <Router>
      <div>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">New list</Link>
            </li>
            <li className="nav-item">
              <Link to="/userdata" className="nav-link">User data</Link>
            </li>
          </ul>
        </nav>

        <StorageProvider value={storage}>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/userdata">
              <UserData />
            </Route>
            <Route path="/">
                <NewList masterList={masterList} setMasterList={setMasterList}
                  newList={newList} setNewList={setNewList}
                  masterItems={masterItems} newItemStatesAndSetters={itemStatesAndSetters}
                  runFetchEffect={runFetchEffect} setRunFetchEffect={setRunFetchEffect}/>
            </Route>
          </Switch>
        </StorageProvider>
      </div>
    </Router>
  );
}

export default App;

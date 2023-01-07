import {
  HashRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './styles/navbar.css';
import './styles/buttons.css';
import './styles/list.css';
import React from 'react';
import { Item, ItemStatesAndSetters } from './types/item';

import NewList from './pages/NewList';
import { PreviousLists } from './pages/PreviousLists';
import DataPage from './pages/DataPage';
import { openDb } from './storage/storageDefs';
import { StorageType, StorageProvider } from './contexts/storage';

const { useEffect, useState } = React;
const storage = new StorageType();

// eslint-disable-next-line func-names
(function () {
  openDb(indexedDB).then((db) => {
    storage.setDB(db);
    storage.fetch();
  });
}());

function App() {
  const [masterList, setMasterList] = useState(new Set<string>([]));
  const [dbIsEmpty, setDBIsEmpty] = useState(false);
  const [masterItems, setMasterItems] = useState([] as Item[]);
  const [newList, setNewList] = useState<Item[]>([]);
  const [dateMap, setDateMap] = useState<Map<number, Item[]>>(new Map<number, Item[]>());
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(undefined as (string | undefined));
  const [existing, setExisting] = useState(false);
  const [runFetchEffect, setRunFetchEffect] = useState(false);
  const itemStatesAndSetters: ItemStatesAndSetters = {
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
    setDate,
    category,
    setCategory,
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
      if (runFetchEffect) setRunFetchEffect(false);
      setDBIsEmpty((mList.length === 0));
      setMasterList(new Set<string>(mList.map((item) => item.name)));
      const nameToItem = new Map<string, Item>();
      const currentList: Item[] = [];
      const dateMapTemp = new Map<number, Item[]>();
      mList.forEach((item) => {
        if (!item.saved) {
          currentList.push(item);
        }

        const prevItem = nameToItem.get(item.name);
        if (!prevItem) {
          nameToItem.set(item.name, item);
        } else if (prevItem.date < item.date) {
          nameToItem.set(item.name, item);
        }

        if (item.saved) {
          const dateItemList = dateMapTemp.get(item.date.valueOf());
          if (!dateItemList) {
            dateMapTemp.set(item.date.valueOf(), [item]);
          } else {
            dateItemList.push(item);
          }
        }
      });
      setMasterItems([...nameToItem.values()]);
      setNewList(currentList);
      if (currentList.length) {
        setDate(currentList[0].date);
      }
      setDateMap(dateMapTemp);
    };
    storage.addListener(dbListener);

    // eslint-disable-next-line consistent-return
    return function cleanup() {
      storage.removeListener(dbListener);
    };
  });

  return (
    <HashRouter>
      <div>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">New list</Link>
            </li>
            <li className="nav-item">
              <Link to="/previous" className="nav-link">Previous lists</Link>
            </li>
            <li className="nav-item">
              <Link to="/data" className="nav-link">Data</Link>
            </li>
          </ul>
        </nav>
        <div className="nav-space" />
        <br />

        <StorageProvider value={storage}>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/data">
              <DataPage setRunFetchEffect={setRunFetchEffect} />
            </Route>
            <Route path="/previous">
              <PreviousLists dateMap={dateMap} setNewList={setNewList} date={date} />
            </Route>
            <Route path="/">
              <NewList
                masterList={masterList}
                setMasterList={setMasterList}
                newList={newList}
                setNewList={setNewList}
                masterItems={masterItems}
                newItemStatesAndSetters={itemStatesAndSetters}
                setRunFetchEffect={setRunFetchEffect}
              />
            </Route>
          </Switch>
        </StorageProvider>

        <footer><small>&copy; Dennis Francis 2021</small></footer>
      </div>
    </HashRouter>
  );
}

export default App;

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './bootstrap.min.css';

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
                <NewList />
            </Route>
          </Switch>
        </StorageProvider>
      </div>
    </Router>
  );
}

export default App;

import React, { useContext, useState } from 'react';
import { StorageContext } from '../contexts/storage';

import '../styles/datapage.css';

function DataPage(props: {
  setRunFetchEffect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState(window.localStorage.getItem('settings_name'));
  const [message, setMessage] = useState(window.localStorage.getItem('settings_message'));
  const [importStatus, setImportStatus] = useState(0);

  const storage = useContext(StorageContext);

  const { setRunFetchEffect } = props;

  function handleNameChange(e: React.FormEvent<HTMLInputElement>) {
    setName(e.currentTarget.value);
  }

  function handleMessageChange(e: React.FormEvent<HTMLTextAreaElement>) {
    setMessage(e.currentTarget.value);
  }

  function handleSave() {
    if (name) {
      window.localStorage.setItem('settings_name', name);
    }

    if (message) {
      window.localStorage.setItem('settings_message', message);
    }
  }

  function handleClear() {
    window.localStorage.removeItem('settings_name');
    window.localStorage.removeItem('settings_message');
    setName('');
    setMessage('');
  }

  function handleExport() {
    storage.exportToJSONText().then((text) => {
      const a = document.createElement('a');
      const file = new Blob([text], { type: 'text/plain' });
      a.href = URL.createObjectURL(file);
      a.download = `shopping-list-export-${(new Date()).toLocaleDateString()}.json`;
      a.click();
    });
  }

  function handleImport() {
    const inp = document.getElementById('importFile');
    inp?.click();
  }

  function onLocalStorageChanged() {
    setName(window.localStorage.getItem('settings_name'));
    setMessage(window.localStorage.getItem('settings_message'));
  }

  function handleImportFile() {
    const inp = document.getElementById('importFile') as HTMLInputElement;
    if (!inp || !inp.files || !inp.files.length) return;
    inp.files[0].text().then((jsonText) => storage
      .importFromJSONText(jsonText)).then((res: boolean) => {
      if (res) {
        onLocalStorageChanged();
        setRunFetchEffect(true);
      }
      setImportStatus(res ? 1 : -1);
      setTimeout(() => {
        setImportStatus(0);
      }, 1000);
      return true;
    });
  }

  let importButtonText = 'Import from file';
  if (importStatus === -1) {
    importButtonText = 'Import failed';
  } else if (importStatus !== 0) {
    importButtonText = 'Import successful!';
  }

  const settingsNameId = 'settings-name';

  return (
    <div id="data-page">
      <div id="import-export">
        <input
          type="button"
          value="Export Data"
          className="data-button data-export-button"
          onClick={handleExport}
          style={{ marginBottom: 20 }}
        />
        <input
          type="button"
          value={importButtonText}
          className="data-button data-import-button"
          onClick={handleImport}
        />
        <input
          type="file"
          id="importFile"
          onChange={handleImportFile}
          style={{ display: 'none' }}
          accept=".json"
        />
      </div>
      <br />
      <div className="sepline-horiz" />
      <form id="settings-form">
        <h5>Delivery Information</h5>
        <br />
        <div className="mb-3">
          <label
            htmlFor={settingsNameId}
            className="form-label"
          >
            Name
            <input
              type="text"
              id={settingsNameId}
              className="form-control"
              aria-label="Your name"
              placeholder="Your name"
              onChange={handleNameChange}
              // eslint-disable-next-line no-unneeded-ternary
              value={name ? name : ''}
            />
          </label>
        </div>
        <div className="mb-3">
          <label
            htmlFor="settings-message"
            className="form-label"
          >
            Custom message for delivery
            <textarea
              id="settings-message"
              className="form-control"
              rows={6}
              aria-label="Your message"
              placeholder="Your message"
              onChange={handleMessageChange}
              // eslint-disable-next-line no-unneeded-ternary
              value={message ? message : ''}
            />
          </label>
        </div>
        <br />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <input
            type="submit"
            value="Save"
            className="btn btn-success"
            onClick={handleSave}
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
        <br />
      </form>
    </div>
  );
}

export default DataPage;

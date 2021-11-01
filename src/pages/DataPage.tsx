import { useContext, useState } from "react";
import { StorageContext } from "../contexts/storage";

import '../styles/datapage.css'

function DataPage(props: {
    setRunFetchEffect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    let [name, setName] = useState(window.localStorage.getItem('settings_name'));
    let [message, setMessage] = useState(window.localStorage.getItem('settings_message'));
    let [importStatus, setImportStatus] = useState(0);

    const storage = useContext(StorageContext);

    function handleNameChange(e: React.FormEvent<HTMLInputElement>) {
        setName(e.currentTarget.value)
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
        storage.exportToJSONText().then(function (text) {
            let a = document.createElement("a");
            let file = new Blob([text], {type: 'text/plain'});
            a.href = URL.createObjectURL(file);
            a.download = 'shopping-list-export-' + (new Date()).toLocaleDateString() + '.json';
            a.click();
        });
    }

    function handleImport() {
        let inp = document.getElementById('importFile');
        inp?.click();
    }

    function handleImportFile() {
        let inp = document.getElementById('importFile') as HTMLInputElement;
        if (!inp || !inp.files || !inp.files.length)
            return;
        inp.files[0].text().then(function (jsonText) {
            return storage.importFromJSONText(jsonText);
        }).then((res: boolean) => {
            if (res) {
                onLocalStorageChanged();
                props.setRunFetchEffect(true);
            }
            setImportStatus(res ? 1 : -1);
            setTimeout(() => {
                setImportStatus(0);
            }, 1000);
            return true;
        });
    }

    function onLocalStorageChanged() {
        setName(window.localStorage.getItem('settings_name'));
        setMessage(window.localStorage.getItem('settings_message'))
    }

    return (
        <div id="data-page">
            <div id="import-export">
                    <input type="button" value={"Export Data"} className="data-button data-export-button"
                            onClick={handleExport} style={{marginBottom: 20}}></input>
                    <input type="button" value={importStatus === 0 ? "Import from file" : (importStatus === -1 ? "Import failed!" : "Import successful!")}
                            className="data-button data-import-button"
                            onClick={handleImport}></input>
                    <input type="file" id="importFile" onChange={handleImportFile}
                        style={{display: "none"}} accept=".json"></input>
            </div>
            <br></br>
            <div className="sepline-horiz"></div>
            <form id="settings-form">
                <h5>Delivery Information</h5>
                <br></br>
                <div className="mb-3">
                    <label htmlFor="settings-name" className="form-label">Name</label>
                    <input type="text" id="settings-name" className="form-control"
                        aria-label="Your name"
                        placeholder="Your name"
                        onChange={handleNameChange}
                        value={name ? name : ''}>
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="settings-message" className="form-label">Custom message for delivery</label>
                    <textarea id="settings-message" className="form-control"
                        rows={6}
                        aria-label="Your message"
                        placeholder="Your message"
                        onChange={handleMessageChange}
                        value={message ? message : ''}>
                    </textarea>
                </div>
                <br></br>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <input type="submit" value={"Save"} className="btn btn-success"
                        onClick={handleSave} style={{flexGrow: 0.40}}></input>
                    <input type="button" value="Clear" className="btn btn-danger"
                        onClick={handleClear} style={{flexGrow: 0.40}}></input>
                </div>
                <br></br>
            </form>
        </div>
    );
}

export default DataPage;
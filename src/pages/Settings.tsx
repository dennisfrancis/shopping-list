import { useState } from "react";

import '../styles/settings.css'

function Settings() {
    let [name, setName] = useState(window.localStorage.getItem('settings_name'));
    let [message, setMessage] = useState(window.localStorage.getItem('settings_message'));

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

    return (
        <form id="settings-form">
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
                    aria-label="Your message"
                    placeholder="Your message"
                    onChange={handleMessageChange}
                    value={message ? message : ''}>
                </textarea>
            </div>
            <br></br>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <input type="submit" value={"Save"} className="btn btn-primary"
                    onClick={handleSave} style={{flexGrow: 0.40}}></input>
                <input type="button" value="Clear" className="btn btn-danger"
                    onClick={handleClear} style={{flexGrow: 0.40}}></input>
            </div>
        </form>
    );
}

export default Settings;
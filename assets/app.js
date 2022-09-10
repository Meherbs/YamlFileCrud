/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {Organizations} from "./components/Organizations";
import {Form} from "./components/Form";

const App = () => {

    const [items, setItems] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        id: -1,
        name: '',
        description: '',
        users: []
    });

    const fetchItems = () => {
        fetch('/organizations')
            .then(response => response.json())
            .then(data => {
                setItems(data.organizations.map((value, index) => {return {
                    'id':index, 'name': value.name, 'description': value.description, 'users': value.users
                }}));
            });
    };

    useEffect( () => {
        fetchItems();
    }, []);

    const openOrganization = (index) => {
        setSelectedItem(items[index]);
        setTimeout(() => {setPopupOpen(true); }, 400);
    };

    const deleteOrganization = (index) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: index })
        };
        fetch('/organizations/delete', requestOptions)
            .then(response => response.json())
            .then(data => setItems(data.organizations.map((value, index) => {return {
                'id':index, 'name': value.name, 'description': value.description, 'users': value.users
            }})));
    }

    const changeItem = (data) => {
        setSelectedItem(data);
    }

    const saveForm = () => {
        closePopup();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedItem.id, data: {
                name: selectedItem.name,
                description: selectedItem.description,
                users: selectedItem.users
            } })
        };
        const url = selectedItem.id !== -1 ? '/organizations/edit' : '/organizations/create';
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => setItems(data.organizations.map((value, index) => {return {
                'id':index, 'name': value.name, 'description': value.description, 'users': value.users
            }})));
    }

    const closePopup = () => {
        setPopupOpen(false);
        setSelectedItem({
            id: -1,
            name: '',
            description: '',
            users: []
        });
    }

    return (
        <div className="row">
            <div className="col-12">
                <button style={{margin: '1em'}} type="button" className="btn btn-primary" onClick={ () => { setPopupOpen(true); } }> Créer un nouveau </button>
            </div>
            <Organizations
                items={items}
                updateItem={openOrganization}
                deleteItem={deleteOrganization}
            />
            <Form
                data={selectedItem}
                changeItem={changeItem}
                saveItem={saveForm}
                displayed={popupOpen}
                closePopup={closePopup}
            >
            </Form>
        </div>
    );
}


createRoot(document.getElementById('root')).render(<App />);

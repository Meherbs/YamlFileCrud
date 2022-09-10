import React, { useState, useEffect } from 'react';
import './form-popup.scss';

const Form = (props) => {
    console.log('props form ::');
    console.log(props);
    const [formItem, setFormItem] = useState(props.data);
    const [newRole, setNewRole] = useState('');
    const [newUser, setNewUser] = useState({
        name: '',
        password: '',
        role: []
    });

    useEffect(() => {
        setFormItem(props.data);
    }, [props.data]);

    const addRole = (event) => {
        const us = JSON.parse(JSON.stringify(newUser));
        us.role.push(newRole);
        setNewRole('');
        setNewUser(us);
    }

    const changeInput = (key, value) => {
        const form = JSON.parse(JSON.stringify(formItem));
        form[key] = value;
        setFormItem(form);
        props.changeItem(form);
    }

    const addUser = () => {
        const form = JSON.parse(JSON.stringify(formItem));
        form.users.push(newUser);
        setFormItem(form);
        setNewUser({
            name: '',
            password: '',
            role: []
        });
        setNewRole('');
        props.changeItem(form);
    }

    const deleteUser = (index) => {
        const form = JSON.parse(JSON.stringify(formItem));
        form.users.splice(index, 1);
        setFormItem(form);
        props.changeItem(form);
    }

    return (
        <div className="form-popup" style={!props.displayed ? { display: 'none'} : null}>
            <div className='row' style={{float: 'right', marginBottom: '2em' }}>
                <button className='btn btn-danger' onClick={() => {props.closePopup();}}>
                    <i className="bi bi-x"></i>
                </button>
            </div>
            <div className='row' style={{marginTop: '1em'}}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label"> <code>Nom </code></label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" value={formItem.name} onChange={(event) => changeInput('name', event.target.value)} />
                    {formItem.name.length === 0 ? <div id="nameHelp" className="form-text">S'il vous plait ajouter un nom pour l'organisation.</div> : null }
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputDescription" className="form-label"> <code>Description </code></label>
                    <textarea className="form-control" id="exampleInputDescription" aria-describedby="descriptionHelp"  value={formItem.description}  onChange={(event) => changeInput('description', event.target.value)}> </textarea>
                    {formItem.description.length === 0 ? <div id="descriptionHelp" className="form-text">S'il vous plait ajouter une description pour l'organisation.</div> : null}
                </div>
                <div className="mb-3">
                    <label className="form-label">  <code> Ajouter un utilisateur </code> </label>
                </div>
                <div className="mb-3">
                    <div className='row'>
                        <div className='col-6'>
                            <label htmlFor="userInputName" className="form-label"> <code>Nom</code></label>
                            <input type="text" className="form-control" id="userInputName" value={newUser.name} onChange={(event) => { setNewUser({...newUser, name: event.target.value});}} />
                        </div>
                        <div className='col-6'>
                            <div className='col-6'>
                                <label htmlFor="userInputPassword" className="form-label"> <code>Mot de passe</code></label>
                                <input type="password" className="form-control" id="userInputPassword" value={newUser.password} onChange={(event) => { setNewUser({...newUser, password: event.target.value});}} />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <label htmlFor="userInputName" className="form-label"> <code>Role </code></label>
                            <input type="text" className="form-control" id="userInputRole" value={newRole} onChange={(event) => { setNewRole(event.target.value); }} />
                        </div>
                        <div className='col-6' style={{marginTop: '2em'}}>
                            <button className='btn btn-primary' style={{marginRight: '1em'}} onClick={(event) => { addRole(event) }}> <i className="bi bi-plus"></i> </button>
                            {newUser.role.length > 0 ? `[${newUser.role.join(', ')}]` : null }
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <button className='btn btn-primary' onClick={(event) => { addUser(); }}> Ajouter un utilisateur </button>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label"> <code> Utilisateurs </code> </label>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Password</th>
                        <th scope="col">Roles</th>
                    </tr>
                    </thead>
                    <tbody>
                    {formItem.users.map((user, index) => (
                        <tr key={`user-row-${index}`}>
                            <th scope="row">{index+1}</th>
                            <td>{user.name}</td>
                            <td>{user.password ? '********' : 'sans mot de passe'}</td>
                            <td>[{user.role.join(', ')}]</td>
                            <td>
                                <button onClick={() => { deleteUser(index);}}>
                                    <i className="bi bi-x"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className='row'>
                    <div className="col-6">
                        <button style={{width: '100%'}} type="button" className="btn btn-primary" onClick={ () => { props.changeItem(formItem); props.saveItem(); } }> Enregistrer </button>
                    </div>
                    <div className="col-6">
                        <button style={{width: '100%'}} type="button" className="btn btn-primary" onClick={ () => { props.closePopup(); } }> Annuler </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {Form};

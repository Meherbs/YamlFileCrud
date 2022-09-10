import React from 'react';

const Organizations = (props) => {
    console.log(props);
    return (
        <div className="organizations">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Descriptions</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.map((item, index) => (
                        <tr key={`item-row-${index}`}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={(event) => {props.updateItem(index);}}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button onClick={(event) => {props.deleteItem(index);}}>
                                    <i className="bi bi-x-square"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export {Organizations};

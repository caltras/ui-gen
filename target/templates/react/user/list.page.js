import React, { useState } from "react";

export default function UserList() {
    
    const [loading, setLoading] = useState(false);
    const [data, setLData] = useState([]);

    const fetchData = (event) =>{
        setLoading(true);
        fetch(`/user`, 
            { 
                method: 'GET' 
            })
        .then( (response) =>{
            return response.json();
        }).then( (json) =>{
            setData(json);
        })
        .catch((err) => {
            setErrorMessage(err);
            setLoading(false);
        });
    }

    const handleEdit = (id) =>{

    }

    const handleDelete = (id) =>{

    }

    const getKeys = () => {
        return [ id, name, username ];
    }
    return (
        <div className="user-table">
            <table class="user-list">
                <thead class="user-list-thead">
                    <tr>
                        <td>Id</td><td>Name</td><td>Username</td>
                    </tr>
                </thead>
                <tbody class="user-list-tbody">
                    { 
                        data.map ( (d) => {
                            return (<tr> { 
                                getKeys().map ( (k) => {
                                    return (<td>{d[k]}</td>);
                                }) 
                            }</tr>);
                        })
                    }
                </tbody>
                <tfoot class="user-list-tfoot">
                </tfoot>
            </table>
        </div>
    );
    
}
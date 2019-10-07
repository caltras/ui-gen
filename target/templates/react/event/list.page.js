import React, { useState } from "react";

export default function EventList() {
    
    const [loading, setLoading] = useState(false);
    const [data, setLData] = useState([]);

    const fetchData = (event) =>{
        setLoading(true);
        fetch(`/event`, 
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
        return [ id, name, start, description ];
    }
    return (
        <div className="event-table">
            <table class="event-list">
                <thead class="event-list-thead">
                    <tr>
                        <td>Id</td><td>User</td><td>Start</td><td>Description</td>
                    </tr>
                </thead>
                <tbody class="event-list-tbody">
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
                <tfoot class="event-list-tfoot">
                </tfoot>
            </table>
        </div>
    );
    
}
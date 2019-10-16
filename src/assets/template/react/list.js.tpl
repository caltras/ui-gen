import React, { useState, useEffect } from 'react';
import translate from 'counterpart';
import { Link } from 'react-router-dom';

export default function {{className}}() {
    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = (event) =>{
        setLoading(true);
        fetch(`{{url}}`, 
            { 
                method: '{{method}}'
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
        fetch(`{{url}}/${id}`, 
        { 
            method: 'DELETE'
        })
        .then( (response) =>{
            fetchData();
            setLoading(false);
        })
        .catch((err) => {
            setErrorMessage(err);
            setLoading(false);
        });
    }

    const getKeys = () => {
        return [ {{fields}} ];
    }
    return (
        <div className="{{domain-ref}}-table">
            {{template}}
        </div>
    );
    
}
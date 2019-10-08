import React, { useState } from "react";

export default function {{className}}() {
    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

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
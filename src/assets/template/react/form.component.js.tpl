import React, { useState } from "react";
import translate from 'counterpart';

export default function {{className}}() {
    
    {{hooks}}
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const handleSubmit = (event) =>{
        if(event){
            event.preventDefault();
        }
        if(!loading){
            const body = JSON.stringify(getProperties());
            if (validate()) {
                setLoading(true);
                fetch(`{{url}}`,{
                    method: "PUT",
                    body: body,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then( (response) =>{
                    setLoading(false);
                }).catch((err) => {
                    setErrorMessage(err);
                    setLoading(false);
                });
            }
        }
        return null;
    }

    const getProperties = () => {
        return { {{fields}} };
    }
    const validate = () => {
        const props = getProperties();
        const err = [];
        Object.keys(props).forEach ( (p) => {
            if (!props[p]) {
                err.push(`${p} is null`);
            }
        });
        if (err.length > 0) {
            setErrorMessage(err);
            return false;
        } else {
            return true;
        }
    }
    return (
        <div className="{{domain-ref}}-container">
            <h1 className="title">{{domain}} - {{page}}</h1>
            <div className="container">
                {{template}}
                { errorMessage && errorMessage.map (e => {
                    return <div className="error"> { e } </div>
                })}
            </div>
        </div>
    );
    
}
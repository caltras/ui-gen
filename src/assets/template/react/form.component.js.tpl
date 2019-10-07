import React, { useState } from "react";

export default function {{className}}() {
    
    {{hooks}}
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) =>{
        if(event){
            event.preventDefault();
        }
        if(!loading){
            if (validate()) {
                setLoading(true);
                fetch(`{{url}}`, 
                    { 
                        method: '{{method}}', 
                        body: getProperties() 
                    })
                .then( (response) =>{
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
            if (props[p]) {
                err.push(`${p} is null`);
            }
        });
        if (err.length > 0) {
            setErrors(err);
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
                { errors.map (e => {
                    return <div className="error"> { e } </div>
                })}
            </div>
        </div>
    );
    
}
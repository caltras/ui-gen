import React, { useState } from "react";

export default function UserCreate() {
    
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) =>{
        if(event){
            event.preventDefault();
        }
        if(!loading){
            if (validate()) {
                setLoading(true);
                fetch(`/user`, 
                    { 
                        method: 'PUT', 
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
        return { id, name, username, password };
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
        <div className="user-container">
            <h1 className="title">User - Create</h1>
            <div className="container">
                <form action="/user" method="PUT" onSubmit={handleSubmit}>
                    
                    <div class="form-input">
                        <label aria-label="user.id">Id:</label>
                        <input type="input"  
                            name="id" 
                            label="user.id" aria-label="user.id"
                            onChange={ (e)=> setId(e.target.value)}/>
                    </div>
                    <div class="form-input">
                        <label aria-label="user.name">Name:</label>
                        <input type="input"  
                            name="name" 
                            label="user.name" aria-label="user.name"
                            onChange={ (e)=> setName(e.target.value)}/>
                    </div>
                    <div class="form-input">
                        <label aria-label="user.username">Username:</label>
                        <input type="input"  
                            name="username" 
                            label="user.username" aria-label="user.username"
                            onChange={ (e)=> setUsername(e.target.value)}/>
                    </div>
                    <div class="form-input">
                        <label aria-label="user.password">Password:</label>
                        <input type="password"  
                            name="password" 
                            label="user.password" aria-label="user.password"
                            onChange={ (e)=> setPassword(e.target.value)}/>
                    </div>
                    <div class="group-button">
                        <button type="button" class="button cancel">
                            label.cancel
                        </button>
                        <button type="submit" class="button submit">
                            label.save
                        </button>
                    </div>
                </form>
                { errors.map (e => {
                    return <div className="error"> { e } </div>
                })}
            </div>
        </div>
    );
    
}
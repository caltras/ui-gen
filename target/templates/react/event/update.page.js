import React, { useState } from "react";

export default function EventUpdate() {
    
    const [id, setId] = useState();
    const [user, setUser] = useState();
    const [start, setStart] = useState();
    const [description, setDescription] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) =>{
        if(event){
            event.preventDefault();
        }
        if(!loading){
            if (validate()) {
                setLoading(true);
                fetch(`/event`, 
                    { 
                        method: 'POST', 
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
        return { id, user, start, description };
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
        <div className="event-container">
            <h1 className="title">Event - Update</h1>
            <div className="container">
                <form action="/event" method="POST" onSubmit={handleSubmit}>
                    
                    <div class="form-input">
                        <label aria-label="event.id">Id:</label>
                        <input type="input"  
                            name="id" 
                            label="event.id" aria-label="event.id"
                            onChange={ (e)=> setId(e.target.value)}/>
                    </div>
                    <div class="form-input">
                        <label aria-label="user.name">User.name:</label>
                        <input type="select"  
                            name="user_name" 
                            label="user.name" aria-label="user.name"
                            onChange={ (e)=> setUser(e.target.value)}/>
                    </div>
                    <div class="form-input">
                        <label aria-label="event.start">Start:</label>
                        <input type="date_time"  
                            name="start" 
                            label="event.start" aria-label="event.start"
                            onChange={ (e)=> setStart(e.target.value)}/>
                    </div>
                    <div class="form-input">
                        <label aria-label="event.description">Description:</label>
                        <input type="textarea"  
                            name="description" 
                            label="event.description" aria-label="event.description"
                            onChange={ (e)=> setDescription(e.target.value)}/>
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
import React, { Component } from "react";

export default class EventUpdateForm extends Component{
    render(){
        return (
            <div className="Update-container">
                <h1 className="title">Event - Update</h1>
                <div className="container">
                    <form action="/event" method="POST" onsubmit="return eventController.submit();">
                
            <div class="form-input">
                <label aria-label="event.id">Id:</label>
                <input type="input"  
                    name="id" 
                    label="event.id" aria-label="event.id">
            </div>
            <div class="form-input">
                <label aria-label="user.name">User.name:</label>
                <input type="select"  
                    name="user_name" 
                    label="user.name" aria-label="user.name">
            </div>
            <div class="form-input">
                <label aria-label="event.start">Start:</label>
                <input type="date_time"  
                    name="start" 
                    label="event.start" aria-label="event.start">
            </div>
            <div class="form-input">
                <label aria-label="event.description">Description:</label>
                <input type="textarea"  
                    name="description" 
                    label="event.description" aria-label="event.description">
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
                </div>
            </div>
        );
    }
}
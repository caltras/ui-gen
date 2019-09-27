import React, { Component } from "react";

export default class UserUpdateForm extends Component{
    render(){
        return (
            <div className="Update-container">
                <h1 className="title">User - Update</h1>
                <div className="container">
                    <form action="/user" method="POST" onsubmit="return userController.submit();">
                
            <div class="form-input">
                <label aria-label="user.id">Id:</label>
                <input type="input"  
                    name="id" 
                    label="user.id" aria-label="user.id">
            </div>
            <div class="form-input">
                <label aria-label="user.name">Name:</label>
                <input type="input"  
                    name="name" 
                    label="user.name" aria-label="user.name">
            </div>
            <div class="form-input">
                <label aria-label="user.username">Username:</label>
                <input type="input"  
                    name="username" 
                    label="user.username" aria-label="user.username">
            </div>
            <div class="form-input">
                <label aria-label="user.password">Password:</label>
                <input type="password"  
                    name="password" 
                    label="user.password" aria-label="user.password">
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
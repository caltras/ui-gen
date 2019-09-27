import React, { Component } from "react";

export default class {{className}}Form extends Component{
    render(){
        return (
            <div className="{{page}}-container">
                <h1 className="title">{{domain}} - {{page}}</h1>
                <div className="container">
                    {{template}}
                </div>
            </div>
        );
    }
}
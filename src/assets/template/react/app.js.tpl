import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { Routes } from './routes/routes';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = { };
  }

  render() {
    return (
        <BrowserRouter children={Routes} basename={"/"} />
    );
  }
}
render(<App />, document.getElementById('root'));

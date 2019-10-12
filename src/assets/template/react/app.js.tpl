import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { Routes } from './routes/routes';
import translate from 'counterpart';
import './style.css';


class App extends Component {
  constructor() {
    super();
    this.state = { };
    translate.registerTranslations('en', require('counterpart/locales/en'));
    translate.registerTranslations('en', require('./locales/en.json'));
  }

  render() {
    return (
      <BrowserRouter children={Routes} basename={"/"} />  
    );
  }
}
render(<App />, document.getElementById('root'));

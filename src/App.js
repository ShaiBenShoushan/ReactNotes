// import logo from './logo.svg';
import './App.css';
import SearchForm from "./components/SearchForm";
import React from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import { useState } from 'react';

Modal.setAppElement('#root');
function App() {
  return (
    <div className="App">
      <SearchForm></SearchForm>
    </div>
  );
}


export default App;

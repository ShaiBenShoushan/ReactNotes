// import logo from './logo.svg';
import './App.css';
import SearchForm from "./components/SearchForm";
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function App() {
  return (
    <SearchForm></SearchForm>
  );
}


export default App;

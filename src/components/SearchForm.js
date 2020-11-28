import React from 'react';
import Modal from 'react-modal';
import './notes.css'
import NewNote from './NewNote.js';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      headerValue: '',
      id: 0,
      modalIsOpen: false,
      notes: [],
      currentNote: {
        header: '',
        body: '',
        id: 0,
        date: '',
      }
    };
  }

onRemove(event){
  //eslint-disable-next-line no-restricted-globals
  let confirmer = confirm("Are you sure you want to delete this note?");
  if(confirmer){
    const newList = this.state.notes.filter((item) => {
      return item.id !== parseInt(event.target.id)});
    const itemToRemove = this.state.notes.find((item) => {
      return item.id === parseInt(event.target.id)});
    this.setState({notes: newList});
  }
}

setModalIsOpen(){
  let bool = !this.state.modalIsOpen;
  this.setState({
    modalIsOpen: bool,
  });
}

onSubmit(event) {
  const date = new Date().toLocaleString();
  event.preventDefault();
  const note = {
    header: this.state.headerValue,
    body: this.state.inputValue,
    id: this.state.id,
    date: date,
  };
  this.setState((state) => {
    return {
      id: state.id + 1,
      inputValue: '',
      headerValue: '',
      notes: [note, ...state.notes]
    }
  });
}


setNotes(event){
  let editedNote = this.state.notes.find(item => {
    return parseInt(event.target.id) === item.id;
  });
  this.setState({
    currentNote: editedNote
  });
}

setNoteChanges(event){
  let newDate = new Date().toLocaleString();
  this.setModalIsOpen();
  const newList = this.state.notes.filter((item) => {
    return item.id !== parseInt(event.target.id)});
    this.setState(state => {
      return state.currentNote.date = newDate;
    });
    this.setState({
      notes: [this.state.currentNote, ...newList]
    }
  );
}

onChange(event) {
  this.setState({
    inputValue: event.target.value,
  });
}

onChangeHeader(event){
  this.setState({
    headerValue: event.target.value,
  });
}

onChangeHeaderModal(event){
  this.setState(state => {
    return state.currentNote.header = event.target.value;
  });
}

onChangeBodyModal(event){
  this.setState(state => {
    return state.currentNote.body = event.target.value;
  });
}


render() {
  return (
    <div className="wrapper">
      <form className="the-form"onSubmit={(event) => this.onSubmit(event)}>
        <label for="noteHeader">Note Header</label>
        <input type="text"
          name="noteHeader"
          id="noteHeader"
          value={this.state.headerValue}
          onChange={(event) => this.onChangeHeader(event)}>
        </input>
        <label for="noteText">Note</label>
        <textarea
          name="noteText"
          id="noteText"
          type="text"
          required
          value={this.state.inputValue}
          onChange={(event) => this.onChange(event)}
        />
        <input type="submit" value="submit"/>
      </form>
      <div className="note-wrap">
      <ul>{this.state.notes.map((note) =>
        <li id={note.id} key={note.id}>
          <div className="button-wrap" onClick={() => this.setModalIsOpen()} id={note.id} key={note.id}>
            <div onClick={(event) => this.setNotes(event)} id={note.id} key={note.id}>
            <NewNote
              key={note.id}
              id={note.id}
              header={note.header}
              body={note.body}
              date={note.date}>
            </NewNote>
            </div>
          </div>
            <div className="remove-div">
              <button id={note.id} onClick={(event) => this.onRemove(event)}>Remove</button>
            </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={() => this.setModalIsOpen()}
            style={
              {
                overlay:{
                  backgtoundColor: 'grey',
                },
                content:{
                  color: 'orange'
                }
              }
            }
          >
            <div className="modal-wrapper">
              <div className="modal">
                <h4>{note.date}</h4>
                <input type="text"
                  name="noteHeaderModal"
                  value={this.state.currentNote.header}
                  onChange={(event) => this.onChangeHeaderModal(event)}
                  >
                  </input>
                <textarea
                  name="username"
                  type="text"
                  value={this.state.currentNote.body}
                  onChange={(event) => this.onChangeBodyModal(event)}
                />
                <div>
                  <button id={this.state.currentNote.id} onClick={(event) => {this.setNoteChanges(event)}}>Save Changes</button>
                </div>
              </div>
            </div>
          </Modal>
        </li>
        )}
      </ul>
      </div>
    </div>
  )
}
}

export default SearchForm;
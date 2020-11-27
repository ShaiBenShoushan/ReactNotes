import React from 'react';
import Modal from 'react-modal';
import './notes.css'
import Note from './NewNote.js'
import NewNote from './NewNote.js';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      headerValue: '',
      // list: [],
      id: 0,
      modalIsOpen: false,
      notes: [],
      currentNote: {
          header: '',
          body: '',
          id: 0,
          date: '',
          key: '',
      }
    };
    this.notes = [];
  }

onClick(event){
  console.log(this.notes,'nigga');
  //eslint-disable-next-line no-restricted-globals
  let confirmer = confirm("Are you sure you want to delete this note?");
  if(confirmer){
    const newList = this.notes.filter((item) => {
      console.log(item.id, event.target.id);
      return item.id != event.target.id});
    this.setState({notes: newList});
    this.notes = newList;
  } else {

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
    const id = this.state.id++;
    const note = {
      header: this.state.headerValue,
      body: this.state.inputValue,
      id: id,
      date: date,
      // key: date + Math.random(),

    };
    this.notes.unshift(note);
    this.setState((state) => {
      return {
        inputValue: '',
        headerValue: '',
        notes: [note, ...state.notes]
      }
  })
}

// ListItem(props){
//   return (
//     <li key={props.id} id={props.id}>
//       <h4 id={props.id}>{props.date}</h4>
//       <h1 id={props.id}>{props.header}</h1>
//       <p id={props.id}>{props.body}</p>
//     </li>
//   )
// }

setNotes(event){
  let editedNote = this.notes.find(item => {
    return event.target.id == item.id;
  });
  this.setState({
    currentNote: editedNote
  });
}

setNoteChanges(event){
  let newDate = new Date().toLocaleString();
  this.setModalIsOpen();
  const newList = this.notes.filter((item) => {
    // console.log(item.id, event.target.id);
    return item.id != event.target.id});
    this.setState(state => {
      return state.currentNote.date = newDate;
    });
  this.notes = [this.state.currentNote, ...newList]
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
          value={this.state.inputValue}
          onChange={(event) => this.onChange(event)}
        />
        <input type="submit" value="submit"/>
      </form>
      <div>
      <ul>{this.notes.map((note) =>
        <div>
          <div onClick={() => this.setModalIsOpen()}>
            <div onClick={(event) => this.setNotes(event)}>
            {/* <this.ListItem */}
            <NewNote
              key={note.id}
              id={note.id}
              header={note.header}
              body={note.body}
              date={note.date}>
            </NewNote>
            {/* </this.ListItem> */}
            </div>
          </div>
            <button id={note.id} onClick={(event) => this.onClick(event)}>Remove</button>
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
        </div>
        )}
      </ul>
      </div>
    </div>
  )
}
}

export default SearchForm;
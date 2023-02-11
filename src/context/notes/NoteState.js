import NoteContext from './NoteContext'
import { useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // TO FETCH ALL NOTES :-
  const fetchNotes = async ()=>{
    // API CALL
    const response = await fetch(`${host}/notes/fetchNotes` , {
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        "auth-token" : localStorage.getItem('token')
      }
    })
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // TO ADD A NOTE :-
  const addNote = async (title, description, tag) => {

    // API CALL
    const response = await fetch(`${host}/notes/createNotes` , {
      method : "post",
      headers : {
        "Content-Type" : "application/json",
        "auth-token" : localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    })

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // TO DELETE A NOTE :-
  const deleteNote = async (id) => {
    // API CALL

    const response = await fetch(`${host}/notes/deleteNotes/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    })
    const json = await response.json();
    console.log(json)

    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }

  // TO EDIT A NOTE :-
  const editNote = async (id, title, description, tag) => {

    // API CALL
    const response = await fetch(`${host}/notes/updateNotes/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    })
    const json = response.json
    console.log(json)

    const newNote = JSON.parse(JSON.stringify(notes))

    for (let i = 0; i < newNote.length; i++) {
      const element = newNote[i];
      if (element._id === id) {
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        break;
      }
    }
    setNotes(newNote)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
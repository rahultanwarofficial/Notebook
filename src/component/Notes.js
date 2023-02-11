import React, { useContext, useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NotesItem';

const Notes = (props) => {
    const theAlert = props.theAlert
    const context = useContext(NoteContext);
    let navigate = useNavigate();

    const { notes, editNote, fetchNotes } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes();
            // eslint-disable-next-line
        }
        else{
            navigate('/login')
        }
    }, [])

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = () => {
        console.log("updating note", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        closeRef.current.click()
        props.theAlert('success', 'Notes Updated Successfuly')
    }

    const updateNote = (currentNote) => {
        updateRef.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const updateRef = useRef(null)
    const closeRef = useRef(null)


    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={updateRef} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note:- </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">description</label>
                                    <textarea type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} rows="10"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 10} className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2 className='text-success'>Your Notes :-</h2>
                <div className="container mx-2 text-danger">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} theAlert={theAlert} />
                })}
            </div>
        </>
    )
}

export default Notes
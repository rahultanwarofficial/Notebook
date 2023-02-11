import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPenToSquare} from '@fortawesome/free-solid-svg-icons'

const NotesItem = (props) => {

    const context = useContext(NoteContext)
    const {deleteNote} = context

    const {note, updateNote} = props
    return (
        <div className="card col-md-3 mx-3 my-3">
                <div className="card-body">
                    <h3 className="card-title">{note.title}</h3>
                    <p className="card-text text-success">{note.description}</p>
                    <h5 href="#" className="text-dark">{note.tag}</h5>
                    <h5 href="#" className="text-dark">{note.date}</h5>
                    <FontAwesomeIcon className='me-3 i' onClick={()=>{deleteNote(note._id); props.theAlert('warning' , 'Notes Deleted Successfuly')}} icon={faTrash} />
                    <FontAwesomeIcon className='me-3 i' onClick={()=>{updateNote(note)}} icon={faPenToSquare} />
                </div>
        </div>
    )
}

export default NotesItem
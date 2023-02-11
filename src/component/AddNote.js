import React , {useState , useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context

    const [note, setNote] = useState({title: "" , description: "" , tag: ""})

    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title , note.description , note.tag)
        props.theAlert('success' , 'Note Added Successfuly')
    }

    const handleChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }

  return (
    <div className='container'>
      <h2 className='text-danger'>Add Notes :-</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange={handleChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">description</label>
          <textarea type="text" className="form-control" id="description" name="description" onChange={handleChange} rows="10"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange}/>
        </div>
        <button type="submit" disabled={note.title.length < 5 || note.description.length < 10} className="btn btn-dark" onClick={handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default AddNote
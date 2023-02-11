import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Navbar } from './component/Navbar';
import { Home } from './component/Home';
import { About } from './component/About';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import {useState} from 'react'

function App() {

  let [alert, setAlert] = useState(null);

  const theAlert = (type, message) => {
    setAlert({
        type: type,
        msg: message
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <>
      <NoteState>
          <Router>
            <Navbar title = "NoteBook"/>
            <Alert alert = {alert}/>
        <div className="container my-4">
            <Routes>
              <Route path='/' element={<Home theAlert = {theAlert}/>} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login theAlert = {theAlert}/>} />
              <Route path='/signup' element={<Signup theAlert = {theAlert}/>} />
            </Routes>
        </div>
          </Router>
      </NoteState>
    </>
  );
}

export default App;

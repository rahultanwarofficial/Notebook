import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {

  const [creds, setCreds] = useState({name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // API CALL
        const response = await fetch(`http://localhost:5000/auth/createUser`, {
            method: "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({name : creds.name, email : creds.email, password : creds.password })
        })
        const json = await response.json()
        console.log(json)

        if(json.success){
            localStorage.setItem("token" , json.token)
            navigate('/')
            props.theAlert('success' , 'Account Created Successfuly')
        }
        else{
          props.theAlert('warning' , 'User Already Exist')
        }

    }

    const handleChange = (e) => {
        setCreds({...creds, [e.target.name]: e.target.value})
    }

  return (
    <form onSubmit={handleSubmit}>
            <h2 className='text-center text-success'>SignUp - To create an account</h2>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={creds.name} onChange={handleChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={creds.email} onChange={handleChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={creds.password} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" value={creds.cpassword} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-dark">Sign Up</button>
        </form>
  )
}

export default Signup
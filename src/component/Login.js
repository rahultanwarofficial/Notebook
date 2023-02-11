import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const [creds, setCreds] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // API CALL
        const response = await fetch(`http://localhost:5000/auth/verifyUser`, {
            method: "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({ email : creds.email, password : creds.password })
        })
        const json = await response.json()
        console.log(json)

        if(json.success){
            localStorage.setItem("token" , json.token)
            navigate('/')
            props.theAlert('success' , 'Login Successfuly')
        }
        else{
            props.theAlert('danger' , 'Invalid Credentials')
        }

    }

    const handleChange = (e) => {
        setCreds({...creds, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className='text-center text-success'>Login Here</h2>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={creds.email} onChange={handleChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={creds.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-dark">Log In</button>
        </form>
    )
}

export default Login
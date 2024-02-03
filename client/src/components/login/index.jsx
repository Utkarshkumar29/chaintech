import React, { useState } from "react";
import { LoginContainer, LoginWrapper } from "../../styles/login";
import { Form, FormHeading, Input, LoginLink, StyledButton } from "../../styles/register";
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";

const Login=()=>{
    const [email,setEmail]=useState("")
    const [password, setPassword] = useState("")
    const [redirect,setRedirect]=useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password })
            if (response.status === 200) {
                setRedirect(true)
            } else {
                console.log('Unexpected response:', response)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert('Invalid Password!')
                } else if (error.response.status === 404) {
                    alert('User not found')
                } else {
                    console.log('Unexpected response:', error.response)
                }
            } else if (error.request) {
                console.log('No response received from the server')
            } else {
                console.log('Error setting up the request', error.message)
            }
        }
    }

    if(redirect){
        return <Navigate to='/home'/>
    }

    return(
        <LoginContainer>
            <LoginWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormHeading>Login Form</FormHeading>
                    <Input placeholder="Enter your email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <Input id="password" placeholder="Enter your password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <Link to='/forgot' style={{paddingBottom:"10px",color:"blue"}}>Forgot Password?</Link> 
                    <StyledButton type="Submit">Login</StyledButton>
                    <LoginLink>
                        <p>Don't have a Account?</p>
                        <Link to='/register' style={{textDecoration:"none"}}><p>Click Here</p></Link>
                    </LoginLink>
                </Form>
            </LoginWrapper>
        </LoginContainer>
    )
}

export default Login
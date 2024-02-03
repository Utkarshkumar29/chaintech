import React, { useEffect, useState } from "react";
import { LoginContainer, LoginWrapper } from "../../styles/login";
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import { Form, FormHeading, Input, StyledButton } from "../../styles/register";

const Forgot=()=>{
    const [email,setEmail]=useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordMatch,setPasswordMatch]=useState(false)
    const [isFocused,setIsFocused]=useState(false)
    const [redirect,setRedirect]=useState(false)
    

    const handleInputFocus=()=>{
        setIsFocused(true)
        setPasswordMatch(true)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const data={
            email,
            password
        }
        try {
            const response=await axios.post('/changePassword',data)
            const result=response.data
            setRedirect(true)
            console.log(result)
        } catch (error) {
            console.log("Error sending the data to the server:",error)
        }
    }

    useEffect(() => {
        if(isFocused){
            if(password!==confirmPassword){
                document.getElementById('confirmPassword').style.borderColor="red"
            }else if(password===confirmPassword){
                document.getElementById('confirmPassword').style.borderColor="green"
                setPasswordMatch(false)
            }
        }
    },[confirmPassword,isFocused,password])

    if(redirect){
        return <Navigate to='/home'/>
    }

    return(
        <LoginContainer>
            <LoginWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormHeading>Create New Password</FormHeading>
                    <Input placeholder="Enter your email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <Input id="password" placeholder="Enter your password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <Input id="confirmPassword" placeholder="Confirm your password" type="password" onChange={(e)=>setConfirmPassword(e.target.value)} onFocus={handleInputFocus}/>{passwordMatch&&(
                        <p>Password doesn't match</p>
                    )}
                    <StyledButton type="Submit">Update Password</StyledButton>
                </Form>
            </LoginWrapper>
        </LoginContainer>
    )
}

export default Forgot
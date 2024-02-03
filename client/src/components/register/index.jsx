import React, { useEffect, useState } from "react";
import { ErrorMessage, Form, FormHeading, Input, LoginLink, RegisterContainer, RegisterWrapper, StyledButton } from "../../styles/register";
import axios from 'axios';
import { Link, Navigate, useParams } from "react-router-dom";

const Register=()=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordMatch,setPasswordMatch]=useState(false)
    const [isFocused,setIsFocused]=useState(false)
    const [redirect,setRedirect]=useState(false)
    const [image, setImage] = useState(null)
    const {id}=useParams()

    const handleInputFocus=()=>{
        setIsFocused(true)
        setPasswordMatch(true)
    }

    const getUserDetails=async()=>{
        const response=await axios.get('/accoundInfo')
        const data=response.data
        setName(data.name)
        setEmail(data.email)
        setImage(data.image)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const data={
            name,
            email,
            password,
            image
        }
        try {
            if(id){
                const updationData={
                    name,
                    email,
                    image
                }
                console.log(name)
                const updateResponse=await axios.post(`/updateUser/${id}`,updationData)
                if(updateResponse.status===201){
                    setRedirect(true)
                }
            } else{
                const response=await axios.post('/register',data)
                const result=response.data
                setRedirect(true)
                console.log(result)
            }
        } catch (error) {
            console.log("Error sending the data to the server:",error)
        }
    }

    const uploadPhoto = async (e) => {
        const files = e.target.files
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append("photos", files[i])
        }
        try {
            const response = await axios.post("/upload", data, {
                headers: { "Content-Type": "multipart/form-data" },
        })
        const { data: filenames } = response
        setImage(filenames)
        } catch (error) {
            console.log("Error uploading photo", error)
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

    useEffect(()=>{
        if(id){
            getUserDetails()
        }
    },[id])

    if(redirect){
        return <Navigate to='/home'/>
    }

    return(
        <RegisterContainer>
            <RegisterWrapper>
                <Form onSubmit={handleSubmit}>
                    <FormHeading>{id ? 'Update User' : 'Register Form'}</FormHeading>
                    <Input value={name} placeholder="Enter your username" type="text" onChange={(e)=>setName(e.target.value)}/>
                    <Input value={email} placeholder="Enter your email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
                    {!id && <Input value={password} id="password" placeholder="Enter your password" type="password" onChange={(e)=>setPassword(e.target.value)}/>}
                    {!id && <Input value={confirmPassword} id="confirmPassword" placeholder="Confirm your password" type="password" onChange={(e)=>setConfirmPassword(e.target.value)} onFocus={handleInputFocus}/>}
                    {passwordMatch&&(
                        <ErrorMessage>Password doesn't match</ErrorMessage>
                    )}
                    <Input type="file" accept="image/*" onChange={uploadPhoto}/>
                    {image && <img src={`http://localhost:4000/uploads/${image}`} alt="Selected Image" style={{paddingBottom:"5px"}}/>}
                    <StyledButton type="Submit">{id ? "Update" : "Register"}</StyledButton>
                    <LoginLink>
                        {id ? (
                            <p>Wanna update your password? <Link to='/forgot' style={{ textDecoration: "underline",color:"blue" }}>Click Here</Link></p>
                            ) : (
                            <p>Already have an account? <Link to='/' style={{ textDecoration: "underline",color:"blue"}}>Click Here</Link></p>
                        )}
                    </LoginLink>
                </Form>
            </RegisterWrapper>
        </RegisterContainer>
    )
}

export default Register

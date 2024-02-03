import React, { useEffect, useState } from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { EditLink, HomeContainer, HomeWrapper, Image, UserDetails } from "../../styles/homePage";

const HomePage=()=>{
    const [user,setUser]=useState("")

    const handleUser=async()=>{
        try {
            const response=await axios.get('/accoundInfo')
            const data=response.data
            console.log(data)
            setUser(data)
        } catch (error) {
            console.log("Error getting account data",error)
        }
    }

    useEffect(()=>{
        handleUser()
    },[])

    return(
        <HomeContainer>
            <HomeWrapper>
                {user && (
                    <UserDetails>
                        <p>User ID: {user.userId}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Created At: {user.iat}</p>
                        <Image src={`http://localhost:4000/uploads/${user.image}`} alt="User Image"/>
                        <EditLink to={`/register/${user.userId}`}>
                        <FontAwesomeIcon icon={faEdit} style={{textDecoration:"none"}}/>
                        </EditLink>
                    </UserDetails>
                )}
            </HomeWrapper>
        </HomeContainer>
    )
}

export default HomePage
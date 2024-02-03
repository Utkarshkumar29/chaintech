import { Link } from "react-router-dom";
import styled from "styled-components";

export const HomeContainer=styled.div`
    max-width: 2600px;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const HomeWrapper=styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const UserDetails = styled.div`
    position: relative;
    border: 1px solid #ddd;
    padding: 20px;
    margin: 20px;
    max-width: 400px;
    text-align: left;
`

export const Image = styled.img`
    max-width: 100%;
    height: auto;
    margin-top: 10px;
`

export const EditLink = styled(Link)`
    position: absolute;
    top: 0px;
    right: 10px;
    margin-top: 10px;
    text-decoration: none;
    color: #007bff;
    &:hover {
        color: red;
    }
`
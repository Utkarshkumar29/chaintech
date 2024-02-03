import styled from 'styled-components'

export const RegisterContainer=styled.div`
    max-width: 2600px;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const RegisterWrapper=styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Form=styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
`

export const FormHeading=styled.p`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
`

export const Input=styled.input`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
`

export const ErrorMessage=styled.p`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`

export const StyledButton=styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`

export const LoginLink=styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    :nth-child(2){
        color: blue;
    }
`
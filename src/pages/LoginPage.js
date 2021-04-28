import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { getUserInfo, loginUser } from '../api/frontendAPI'

const LoginPage = (props) => {
    // const login = login;



    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        let username = e.target[0].value
        let password = e.target[1].value
        let userInfo = await loginUser(username, password)
        console.log(userInfo)
        // window.localStorage.setItem("profile", userInfo.profile.data)
        window.location.replace("/")
        props.history.push("/")
        // console.log(window.localStorage)
            
        
        


    }

    return (
        <div className="formContainer">
            <div></div>
        <div className="formClass">
            <h1>LOGIN</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter user name" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p>Not a member? click <a href="/new-user">here</a>.</p>
        </div>
        </div>
    )
}

export default LoginPage

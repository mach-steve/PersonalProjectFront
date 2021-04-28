import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { newUser } from '../api/frontendAPI'

const NewUser = (props) => {

    const handleCreateNewUser = (e) => {
        e.preventDefault()
        // console.log(e)

        let userInfo = {
            "username": `${e.target[0].value}`,
            "password": `${e.target[1].value}`,
            "first_name": `${e.target[2].value}`,
            "last_name": `${e.target[3].value}`,
            "email": `${e.target[4].value}`,
            "files_user": [],
            "projects": []
        }
        // console.log("UserInfo: ", userInfo)
        // let username = e.target[0].value
        // let password = e.target[1].value
        newUser(userInfo)
        props.history.push("/login")
        
        


    }


    return (
        <div className="formContainer">
            <div></div>
        <div className="formClass">
            <h1>New User</h1>
            <Form onSubmit={handleCreateNewUser}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>



                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </div>
    )
}

export default NewUser

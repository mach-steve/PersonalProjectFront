import React from 'react'
import { Form, Button } from 'react-bootstrap'
import {updateUser, removeUser} from '../api/frontendAPI'


const EditUser = (props) => {
    let profile = JSON.parse(localStorage.profile)
    let userInfo = {
        "id": `${profile.id}`,
        "username": `${profile.username}`,
        "password": `${profile.password}`,
        "first_name": `${profile.first_name}`,
        "last_name": `${profile.last_name}`,
        "email": `${profile.email}`,
        
    }
    // console.log(userInfo)
    const handleEditUser = (e) => {
        e.preventDefault()
        console.log(e)

      
        userInfo.first_name = e.target[0].value
        userInfo.last_name = e.target[1].value
        userInfo.email = e.target[2].value

       console.log(userInfo)
        console.log(updateUser(userInfo, window.localStorage.token))
        alert("Profile successfully updated. Returning to Home Page.")
        window.location.replace("/")
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault()
        alert("Goodbye Account!")
        console.log(JSON.parse(window.localStorage.profile).id)
        await removeUser(JSON.parse(window.localStorage.profile).id)
        window.localStorage.clear()
        window.location.replace("/")
        // console.log(JSON.parse(window.localStorage.profile).id)

    }

    return (
        <div className="formContainer">
            <div></div>
        <div className="formClass">
            <h1>Edit Profile {userInfo.username}</h1>
            <Form onSubmit={handleEditUser}>
               

                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" defaultValue={userInfo.first_name} />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" defaultValue={userInfo.last_name} />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" defaultValue={userInfo.email} />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>



                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
                <button className="deleteButton" onClick={handleDeleteAccount}>Delete Account</button>
        </div>
        </div>
    )
}

export default EditUser

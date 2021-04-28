import React, {useState, useEffect} from 'react'
import {Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';
// import "./authConfig.js"
// import "./graphConfig.js"
// import "./ui.js"
// import signIn from "./authPopup.js" 
// import "./graph.js"


const NavComponent = (props) => {

    const [username, setusername] = useState()
    const [profile, setprofile] = useState('')
    
    function logout(e) {
        e.preventDefault()

        window.localStorage.removeItem("profile")
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("msProfile")
        window.localStorage.removeItem("odToken")
        window.localStorage.removeItem("pkce_code_verifier")
        window.localStorage.removeItem("pkce_state")

        window.location.replace("/")

    }

    useEffect(() => {
        if (window.localStorage.profile) {
            console.log(JSON.stringify(window.localStorage.profile))
            setprofile(JSON.parse(window.localStorage.profile))
        } 
    }, [])

 

    return (
        
       <Navbar bg="dark" expand="lg" dark>

           <div className="navContainer">

           <div className="toTheLeft">
                <a href="/" className="navA"><h4 className="divA">Stevecorder&trade;</h4></a>
           </div>
        <div></div>
            <div className="toTheRight">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <a href="/music" className="navA"><p className="divA">Music</p></a>
                    {!window.localStorage.profile ? <a  href="/login" className="navA"><p className="divA">{"login"}</p></a> : <a href="/profile" className="navA"><p className="divA">{`Hi, ${profile.first_name}!`}</p></a>}
                    <a href="/onedrive" className="navA"><p className="divA">OneDrive</p></a>
                    {window.localStorage.profile ? <a onClick={logout} className="navA"><p className="divA">{"logout"}</p></a> : null }
                    </Nav>
                </Navbar.Collapse>
            </div>
           </div>

        </Navbar>
    )
}

export default NavComponent

import React from 'react'
import { Form, Button } from 'react-bootstrap'

const OneDrive = (props) => {

    // This is a small script that somebody wrote that helps with handling getting an authorization code and, in turn, an 
    // auth token for Microsoft Graph API.
    // It was a godsend after 2 days of running up against a wall.
    const config = {
        client_id: "ec6a8d48-e814-4f0d-a777-bb8d6f37971b",
        redirect_uri: "http://localhost:3000/onedrive",
        authorization_endpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        token_endpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/token/",
        requested_scopes: "User.Read Files.ReadWrite.All"
    };
    
    const getODCode = async (e) => {
        e.preventDefault();
        
        // Create and store a random "state" value
        var state = generateRandomString();
        localStorage.setItem("pkce_state", state);
    
        // Create and store a new PKCE code_verifier (the plaintext random secret)
        var code_verifier = generateRandomString();
        localStorage.setItem("pkce_code_verifier", code_verifier);
    
        // Hash and base64-urlencode the secret to use as the challenge
        var code_challenge = await pkceChallengeFromVerifier(code_verifier);
    
        // Build the authorization URL
        var url = config.authorization_endpoint 
            + "?response_type=code"
            + "&client_id="+encodeURIComponent(config.client_id)
            + "&state="+encodeURIComponent(state)
            + "&scope="+encodeURIComponent(config.requested_scopes)
            + "&redirect_uri="+encodeURIComponent(config.redirect_uri)
            + "&code_challenge="+encodeURIComponent(code_challenge)
            + "&code_challenge_method=S256"
            ;
    
        // Redirect to the authorization server
        window.location = url;
    };
    
    
    //////////////////////////////////////////////////////////////////////
    // OAUTH REDIRECT HANDLING
    
    // Handle the redirect back from the authorization server and
    // get an access token from the token endpoint
    
    var q = parseQueryString(window.location.search.substring(1));
    
    // Check if the server returned an error string
    if(q.error) {
        alert("Error returned from authorization server: "+q.error);
        document.getElementById("error_details").innerText = q.error+"\n\n"+q.error_description;
        document.getElementById("error").classList = "";
    }
    
    // If the server returned an authorization code, attempt to exchange it for an access token
    if(q.code) {
    
        // Verify state matches what we set at the beginning
        if(localStorage.getItem("pkce_state") != q.state) {
            alert("Invalid state");
        } else {
    
            // Exchange the authorization code for an access token
            sendPostRequest(config.token_endpoint, {
                grant_type: "authorization_code",
                code: q.code,
                client_id: config.client_id,
                redirect_uri: config.redirect_uri,
                code_verifier: localStorage.getItem("pkce_code_verifier")
            }, async function(request, body) {
    
                // Setting Graph API Auth token to localStorage to use for authorization with OneDrive
                console.log(body.access_token)
                window.localStorage.setItem("odToken", body.access_token)
                

                // Get MS User Profile
                let msProfInit = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.odToken}`

                    }
                  }
                let msProfileRequest = await fetch("https://graph.microsoft.com/v1.0/me/", msProfInit)
                let msProfile = await msProfileRequest.json()
                window.localStorage.setItem("msProfile", JSON.stringify(msProfile))
                console.log(msProfile)
                  window.location.replace("/")
                // Replace the history entry to remove the auth code from the browser address bar
                // window.history.replaceState({}, null, "/");
    
            }
            
            );
        }
     }
    
    
    //////////////////////////////////////////////////////////////////////
    // GENERAL HELPER FUNCTIONS
    
    // Make a POST request and parse the response as JSON
    function sendPostRequest(url, params, success, error) {
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function() {
            var body = {};
            try {
                body = JSON.parse(request.response);
            } catch(e) {}
    
            if(request.status == 200) {
                success(request, body);
            } else {
                console.error(request, body);
            }
        }
        request.onerror = function() {
            error(request, {});
        }
        var body = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        request.send(body);
    }
    
    // Parse a query string into an object
    function parseQueryString(string) {
        if(string == "") { return {}; }
        var segments = string.split("&").map(s => s.split("=") );
        var queryString = {};
        segments.forEach(s => queryString[s[0]] = s[1]);
        return queryString;
    }
    
    
    //////////////////////////////////////////////////////////////////////
    // PKCE HELPER FUNCTIONS
    
    // Generate a secure random string using the browser crypto functions
    function generateRandomString() {
        var array = new Uint32Array(28);
        window.crypto.getRandomValues(array);
        return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
    }
    
    // Calculate the SHA256 hash of the input text. 
    // Returns a promise that resolves to an ArrayBuffer
    function sha256(plain) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }
    
    // Base64-urlencodes the input string
    function base64urlencode(str) {
        // Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
        // btoa accepts chars only within ascii 0-255 and base64 encodes them.
        // Then convert the base64 encoded to base64url encoded
        //   (replace + with -, replace / with _, trim trailing =)
        return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    
    // Return the base64-urlencoded sha256 hash for the PKCE challenge
    async function pkceChallengeFromVerifier(v) {
        let hashed = await sha256(v);
        return base64urlencode(hashed);
    }


    return (
        <div className="odButtonContainer">
            <div></div>
        <div className="formClass">
            <h1>OneDrive</h1>
            <Form onSubmit={getODCode}>
                
                <Button variant="primary" type="submit">
                    Sign In to OneDrive
                </Button>
            </Form>
        </div>
        </div>
    )
}

export default OneDrive

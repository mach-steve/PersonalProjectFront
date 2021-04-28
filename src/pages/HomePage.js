import React from 'react'


export default function HomePage(props) {
    let storage = window.localStorage
    let codeObj = {};
    let obj = {};
    

    

    if (window.location.toString().indexOf("code") != -1) {
        // let re = /=([A-Za-z0-9.&\-_:\/]*)/;
        
        let codeStr = window.location.toString().split("?")[1]
        let a = codeStr.split('=')
        let paramName = a[0]
        let paramValue = a[1]

        
        let odToken = getOdToken(paramValue)
        console.log("od token: ",odToken)
        // let codeQuerArr = codeStr.split('&');
        // // console.log(codeQuerArr)

        // for (let i = 0; i < codeQuerArr.length; i++) {
        //     // separate the keys and the values
        //     let a = codeQuerArr[i].split('=');

        //     var paramName = a[0];
        //     var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

        //     if (paramName == "code") {
        //         console.log('paramname: ', paramValue)
        //         getOdToken(paramValue).then((odToken) => {

        //             window.localStorage.setItem('odToken', JSON.stringify(odToken))
        //         })
        //     }

        //     if (!codeObj[paramName]) {
        //         // if it doesn't exist, create property
        //         codeObj[paramName] = paramValue;
        //     } else if (codeObj[paramName] && typeof codeObj[paramName] === 'string'){
        //         // if property does exist and it's a string, convert it to an array
        //         codeObj[paramName] = [codeObj[paramName]];
        //         codeObj[paramName].push(paramValue);
        //     } else {
        //         // otherwise add the property
        //         codeObj[paramName].push(paramValue);
        //     }
            
        // }

       
        async function getOdToken(code) {
            console.log("here's your code ", code)
    
            
            let details = {
                "client_id":"ec6a8d48-e814-4f0d-a777-bb8d6f37971b",
                "scope": "user.read",
                "code": `${code}`,
                "redirect_uri": "http://localhost:3000/",
                "grant_type": "authorization_code",
                "client_secret": "Anzq9DPt2Yc9mcBEd4xfo2MCc_.H_b-0~Q"
                
            }
            
            let formBody = [];
                    
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            console.log(formBody)
    
            let init = {
                method: "POST",
                headers: {
                    "Origin": "http://localhost:3000/",
                    "Content-Type": "application/x-www-form-urlencoded; charset_UTF-8"
                },
                body: formBody
            }
    
                // let response = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token/", init)
                // console.log("response: ", response)
                // let stringRes = await response.json()
                // return stringRes
        }
        
        // storage.setItem("odCodeInfo", JSON.stringify(codeObj))
        // // console.log(JSON.parse(window.localStorage.odCodeInfo).code)      
        // // console.log(JSON.parse(window.localStorage.odCodeInfo).state)        
        
        // // props.history.push("/")
        // console.log("codeobj.code: ", codeObj.code)
        // console.log("storage code: ", JSON.parse(storage.odCodeInfo).code)
    }
    
    

    // if (window.location.toString().indexOf("#") != -1) {

    // }
        
        // const queryString = window.location.toString().split('#')[1];
        // let querArr = queryString.split('&');
        // console.log(querArr)

        // for (let i = 0; i < querArr.length; i++) {
        //     // separate the keys and the values
        //     let a = querArr[i].split('=');

        //     var paramName = a[0];
        //     var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

        //     if (!obj[paramName]) {
        //         // if it doesn't exist, create property
        //         obj[paramName] = paramValue;
        //     } else if (obj[paramName] && typeof obj[paramName] === 'string'){
        //         // if property does exist and it's a string, convert it to an array
        //         obj[paramName] = [obj[paramName]];
        //         obj[paramName].push(paramValue);
        //     } else {
        //         // otherwise add the property
        //         obj[paramName].push(paramValue);
        //     }

        //     }
        // storage.setItem("odAuthenticationInfo", JSON.stringify(obj))
        // console.log(JSON.parse(window.localStorage.odAuthenticationInfo)["access_token"])
        
        // const urlParams = new URLSearchParams(params);
    // const odAccessToken = urlParams.get('access_token')

    // console.log(odAccessToken)

    // http://localhost:3000/#access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImJXOFpjTWpCQ25KWlMtaWJYNVVRRE5TdHZ4NCJ9.eyJ2ZXIiOiIyLjAiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkL3YyLjAiLCJzdWIiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFCcV83REJGMk4tR2N4MmdNeXl2ME1rIiwiYXVkIjoiZDIxM2QxZWItYmQzYy00MjQxLWE5OWMtNGQ3YmIxMTZiMjczIiwiZXhwIjoxNjE5NDc2NDY2LCJpYXQiOjE2MTk0NzI1NjYsIm5iZiI6MTYxOTQ3MjU2NiwibmFtZSI6IlN0ZXZlbiBMYXdsZXNzIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibWFjaHN0ZXZlMjAwMkBzYmNnbG9iYWwubmV0Iiwib2lkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLWQyNDItY2ZjMGQ2NDU2MWIwIiwidGlkIjoiOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkIiwiYXpwIjoiZDIxM2QxZWItYmQzYy00MjQxLWE5OWMtNGQ3YmIxMTZiMjczIiwic2NwIjoib25lZHJpdmUucmVhZHdyaXRlIiwiYXpwYWNyIjoiMCIsImFpbyI6IkRZSkJIWU16MmtsTjc3YnVIeUY0Z2d1YjdueWZadmhqRnozcmc3dDJ0RmNaRHNmT091SVZURk5lck5GOGZFVnNhWEJ4d0lobHp1UUxnOXp0ZXRDdUxUTDdNYXNvNWFVWnFsM1l1cipJWjdwcTdRdDghUWUyMEE0RzZaVllaT1o2R016MWZUbThFOEZRTjQyVk05MFohNzQkIn0.FlFvtn-9PNQzHq9PTUhrGJH83of9iknQbqJUKs4fAMnbk8p-jIPryAJHLB3Lm8YQUYIAIfDQ1WW73aer_EaYqDmYEUQF4k8cCQHE0w0J7Sx-wUfGFGQ1Byzr3nwxShKL5BMi7SQRd5pos3jkVC4ipREj9b1Zx05G7L60WBk9czjMsP1z3s3eStERIbTsQ3-a3UUx2V4Btxhzl52X0tp-_e1IxRY5XlKq4-R724aralYVPY2xsw861t_Lwi5qc790-xRlAweLQnFJUlxZCCLbzkspPyH9xHxHn_ei4cGgjwdVZYUS-piwT6wJdWgrdNVPHC5H5lVtD6mC6spAALGg2A&token_type=bearer&expires_in=3600&scope=api://d213d1eb-bd3c-4241-a99c-4d7bb116b273/onedrive.readwrite
    return (
        <div className="homeBody">
            <h1>Rosewood Studios Online</h1>
        </div>
    )
}

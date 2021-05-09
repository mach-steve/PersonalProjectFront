const BASE_URL = "http://localhost:8000/"
// const BASE_URL = "https://personalprojectlawless.herokuapp.com/"



const getToken = async (username, password) => {
    let init = {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "username": `${username}`,
            "password": `${password}`
        })
      }
    let tokenResponse = await fetch(BASE_URL + "api-token-auth/", init)
    let token = await tokenResponse.json()
    localStorage.setItem("token", token.token);

    return token.token
}

const loginUser = async (username, password) => {
    let token = await getToken(username, password)
    console.log(username)
    let Profile = await getUserInfo(username, token)
    return {
        "token": token,
        "profile": Profile
    }
}

const newUser = async (userInfo) => {
    let init = {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(userInfo)
      }
    console.log(init)
    let response = await fetch(BASE_URL+'users/new-user/', init)
    let stringifiedResponse = await response.json()
    return stringifiedResponse
}

const getUserInfo = async (userName, token) => {
    let init = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Token ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
            "username": `${userName}`
        })
      }
    console.log("Init: ",init)
    let response = await fetch(BASE_URL+`users/get-user-info/`, init)
    let stringifiedResponse = await response.json()

    localStorage.setItem("profile", JSON.stringify(stringifiedResponse.data[0]))
    console.log(JSON.stringify(stringifiedResponse.data))
    
    return stringifiedResponse
}

const updateUser = async (userInfo, token) => {
    let init = {
        headers: {
          'Content-Type': 'application/json',
          'AUTHORIZATION': `Token ${token}`
        },
        method: 'PATCH',
        body: JSON.stringify({
            "first_name": `${userInfo.first_name}`,
            "last_name": `${userInfo.last_name}`,
            "email": `${userInfo.email}`
        })
      }
    console.log(userInfo.id)
    let response = await fetch(BASE_URL+`users/users/${userInfo.id}/`, init)
    let stringifiedResponse = await response.json()
    localStorage.setItem("profile", JSON.stringify(stringifiedResponse))
    return stringifiedResponse
}

const removeUser = async (userId) => {
  let init = {
    headers: {
      'AUTHORIZATION': `Token ${window.localStorage.token}`
    },
    method: 'DELETE'
  }
  let response = await fetch(BASE_URL+`users/users/${JSON.parse(window.localStorage.profile).id}/`, init)
  console.log(response)
  let stringifiedResponse = await response.json()
  return stringifiedResponse
}


const dbUpload = async (file) => {
  let currentdate = new Date();
  let dateTime = `${currentdate.getDate()}-${currentdate.getMonth()}-${currentdate.getFullYear()}`
  let userId = JSON.parse(window.localStorage.profile).id

  let formData = new FormData()
  formData.append('file', file)


  let init = {
    method: "POST",
      headers: {
          'Content-Type': 'audio/wav',
          'Authorization': `Token ${window.localStorage.token}`
      },
      body: formData
    }
  let dbSendRequest = await fetch(`http://localhost:8000/users/files/`, init)
  let stringifiedDBSend = await dbSendRequest.json()
  console.log(dbSendRequest)
  return stringifiedDBSend
}


export {
    loginUser,
    newUser,
    getUserInfo,
    updateUser,
    removeUser,
    dbUpload
}
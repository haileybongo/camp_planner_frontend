
function signupFormHandler(e){
    e.preventDefault()
    
    let username = document.querySelector("#signUsername").value
    let password = document.querySelector("#signPassword").value
    let password_confirmation = document.querySelector("#passwordConfirmation").value

    signupUser(username, password, password_confirmation)
}

function loginFormHandler(e){
    e.preventDefault()
    
    let username = document.querySelector("#logUsername").value
    let password = document.querySelector("#logPassword").value
    loginUser(username, password)
}

function signupUser (username, password, password_confirmation){
    fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: username,
      password: password,
      password_confirmation: password_confirmation   
    }
  })
})
  .then(response => response.json())
  .then(user => {
      if (user.error){
              document.getElementById("signUpHeader").innerHTML += 
              ` <p style="color:red;"> ${user.error} </p>`    
      }
      else{
      console.log(user)
      localStorage.setItem('jwt-token', user.jwt)
      document.documentElement.scrollTop = 0;
      location.reload();}
  })
  .catch(error => {
      debugger
  })
}

function loginUser (username, password){
    fetch('http://localhost:3000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: username,
      password: password,  
    }
  })
})
  .then(response => response.json())
  .then(user => {
      debugger
    if (user.message){
        document.getElementById("logInHeader").innerHTML += 
        ` <p style="color:red;"> ${user.message} </p>`    
    }
    else{
      localStorage.setItem('jwt-token', user.jwt)
      document.documentElement.scrollTop = 0;
      location.reload();
    }
  })
}


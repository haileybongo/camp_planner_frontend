

document.addEventListener('DOMContentLoaded', () => {


    const navBar = document.querySelector("#navBar")

    navBar.addEventListener("click", (e) =>
    
    navBarHandler(e))


   if (localStorage.getItem('jwt-token') === null){
    document.getElementById("tmMainNav").hidden = true;
    document.getElementById("loginNav").hidden = false;
   } else{
    document.getElementById("tmMainNav").hidden = false;
    document.getElementById("loginNav").hidden = true;
   }

})

function getTrips() {
    fetch("http://localhost:3000/api/trips", {
        method:"GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem('jwt-token')}`
        }
    })
    .then(response => response.json())
    .then (trips => {
        for (const element of trips.data){   
            let newTrip = new Trip(element.id, element.attributes)
            debugger 
            new Item(newTrip.item.id, newTrip.item)
            document.getElementById('tripList').innerHTML += newTrip.renderLinks()
              
    }})
    }

function getItems(){
    fetch("http://localhost:3000/api/items")
    .then(response => response.json())
    .then(items => {
        for (const element of items.data){
            let newItem = new Item(element.id, element.attributes)
            document.getElementById('listContainer').innerHTML += `<h5 class="tm-color-primary">${newItem.name}</h5>`
            document.getElementById('listContainer').innerHTML += newItem.renderList()
            document.getElementById('listContainer').innerHTML += `<br><br>`
        }
    })
}

function createFormHandler(e) {
    e.preventDefault()
    let locationInput = document.querySelector("#trip-location").value
    let campgroundInput = document.querySelector("#trip-campground").value
    let arrivalInput = document.querySelector("#trip-arrival").value
    let departureInput = document.querySelector("#trip-departure").value
    let packingList = document.querySelector("#packingList").value

    postFetch(locationInput, campgroundInput, arrivalInput, departureInput, packingList)

}

function postFetch(location, campground, arrival, departure, item){

        fetch("http://localhost:3000/api/trips", {
            method: "POST",
            headers:{"Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwt-token')}`},     
            body: JSON.stringify({
                location: location,
                campground: campground,
                arrival: arrival,
                departure: departure,
                item: item
            })
        })
        .then(response => response.json())
        .then(trip => {
            debugger
            let newTrip = new Trip(trip.data.id, trip.data.attributes)
            if (Item.findById(newTrip.item.id)){
                let list = Item.findById(newTrip.item.id)
            } else{

                new Item(newTrip.item.id, newTrip.item.list)
            }

            let tripList = Item.findById(newTrip.item.id)

            document.getElementById('tripList').innerHTML += newTrip.renderLinks()
            document.getElementById('tripDetails').innerHTML += newTrip.renderTripDetails()
            document.getElementById('listItems').innerHTML = tripList.renderList()
        })
        }         

function tripLinkHandler(e){

    e.preventDefault()
    let clickedTrip = Trip.findById(e.target.parentElement.id)
    let tripList = Item.findById(clickedTrip.item.id)

    document.getElementById('tripDetails').innerHTML = ""
    document.getElementById('tripDetails').innerHTML += clickedTrip.renderTripDetails()
    document.getElementById('listItems').innerHTML = tripList.renderList()

}

function navBarHandler(e){
    button = e.target.innerText


    if (button === "MY TRIPS"){
        let html = document.querySelector("#myTrips").innerHTML
        if (html === ""){ 
            document.querySelector("#myTrips").innerHTML += 
        `                       
        <h2 class="tm-section-title tm-color-primary mb-5">My Trips</h2>
        <p class="mb-5" id="tripList">
          <ul>
          </ul>
        </p>`
        getTrips()
        const tripList = document.querySelector("#tripList")
        tripList.addEventListener("click", (e) =>
        tripLinkHandler(e))
    }}
    else if (button === "NEW TRIP"){
        let html = document.querySelector("#newForm").innerHTML
        if (html === ""){

        document.querySelector("#newForm").innerHTML +=
        `                <div class="w-100 tm-double-border-1 tm-border-gray">
        <div class="tm-double-border-2 tm-border-gray tm-box-pad">
          <div class="tm-gallery-wrap">
        <h2 class="tm-color-primary tm-section-title mb-4 ml-2">New Trip</h2>
                          
        <form id = "create-trip" class = "mb-5">
          <label for="location"> Location:</label><br>
          <input id= 'trip-location' type="text" name="location" value = "" placeholder = 'Enter Location of Trip' required>
          <br><br>
          <label for="location"> Campground:</label><br>
          <input id = 'trip-campground' type = 'text' name='campground' value = '' placeholder = 'Enter Campground Name' required>
          <br><br>
          <label for="location"> Arrival Date:</label><br>
          <input id = 'trip-arrival' type = 'date' name = 'arrival' value = '' required>
          <br><br>
          <label for="location"> Departure Date:</label><br>
          <input id = 'trip-departure' type = 'date' name = 'departure' value = '' required>
          <br><br>

          <label for="item"> Packing List:</label><br>
          <select id="packingList" name = "item" required>
            <option value = "" disabled selected hidden> Choose a List</option>
            <option value = "1"> Basic Camping List</option>
            <option value = "2"> Backpacking List</option>
            <option value = "new">Create New List </option>
          </select>
          <br><br>

          <input id = 'create-button' type='submit' name = 'submit' value = "Create Trip" class = 'submit'>
          </form>
          </div>
          </div>
          </div>
        `
        const createTripForm = document.querySelector("#create-trip")

        createTripForm.addEventListener("submit", (e) => 
        createFormHandler(e))

    }}
    else if (button === "PACKING LISTS"){
        let html = document.querySelector("#availableLists").innerHTML
        if (html === ""){
        document.querySelector("#availableLists").innerHTML +=
        `  <div class="w-100 tm-double-border-1 tm-border-gray">
            <div class="tm-double-border-2 tm-border-gray tm-box-pad">
            <div class="tm-gallery-wrap">
              <h2 class="tm-color-primary tm-section-title mb-4 ml-2">Packing Lists</h2>
              <div id = "listContainer">


              </div>                 
            </div>                  
            </div>     
        </div>  `
        getItems()
    }}
    else if (button === "SIGN UP"){
        let html = document.querySelector("#signupForm").innerHTML
        if (html === ""){
        document.querySelector("#signupForm").innerHTML +=
        `<div class="tm-contact-form-wrap"> 
        <form class="tm-contact-form">
        <div class="form-group">
        <h2 class="tm-color-primary tm-section-title mb-4 ml-2">Sign Up</h2>
        <br>
        </div>
            <div class="form-group">
              <input type="text" id="username" name="username" class="form-control rounded-0 border-top-0 border-right-0 border-left-0" placeholder="Username" required />
            </div>
            <div class="form-group">
            <input type="text" id="password" name="password" class="form-control rounded-0 border-top-0 border-right-0 border-left-0" placeholder="Password" required />
            </div>
            <div class="form-group">
            <input type="text" id="passwordConfirmation" name="password_confirmation" class="form-control rounded-0 border-top-0 border-right-0 border-left-0" placeholder="Confirm Password" required />
            </div>
            <div class="form-group mb-0">
              <button type="submit" class="btn rounded-0 d-block ml-auto tm-btn-primary">
                SIGNUP
              </button>
            </div>
          </form>
      </div>  `
      const signupForm = document.querySelector("#signupForm")

      signupForm.addEventListener("submit", (e) => 
      signupFormHandler(e))
    }}
    else if (button === "LOG IN"){
        let html = document.querySelector("#loginForm").innerHTML
        if (html === ""){
        document.querySelector("#loginForm").innerHTML +=
        `<div class="tm-contact-form-wrap"> 
        <form class="tm-contact-form">
        <div class="form-group">
        <h2 class="tm-color-primary tm-section-title mb-4 ml-2">Log In</h2>
        <br>
        </div>
            <div class="form-group">
              <input type="text" id="username" name="username" class="form-control rounded-0 border-top-0 border-right-0 border-left-0" placeholder="Username" required />
            </div>
            <div class="form-group">
            <input type="text" id="password" name="password" class="form-control rounded-0 border-top-0 border-right-0 border-left-0" placeholder="Password" required />
            </div>
            <div class="form-group mb-0">
              <button type="submit" class="btn rounded-0 d-block ml-auto tm-btn-primary">
                LOG IN
              </button>
            </div>
          </form>
      </div>  `

      const loginForm = document.querySelector("#loginForm")

      loginForm.addEventListener("submit", (e) => 
      loginFormHandler(e))
    }}


}

function campSearch (state, query){ 
    fetch("http://developer.nps.gov/api/v1/campgrounds?stateCode="+state+"q="+query+"&api_key=qblPW1KHLut8x7u6TbqmyIztfGiG59XKDjiYKmBn", {
        method: "GET",
        headers:{"Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://developer.nps.gov/api/v1"}
    })
    .then(response => response.json())
    .then(results =>{
        debugger
    } )
}

function signupFormHandler(e){
    e.preventDefault()
    
    let username = document.querySelector("#username").value
    let password = document.querySelector("#password").value
    let password_confirmation = document.querySelector("#passwordConfirmation").value

    signupUser(username, password, password_confirmation)
}

function loginFormHandler(e){
    e.preventDefault()
    
    let username = document.querySelector("#username").value
    let password = document.querySelector("#password").value

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
      console.log(user)
      localStorage.setItem('jwt-token', user.jwt)
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
      console.log(user)
      localStorage.setItem('jwt-token', user.jwt)
  })
}





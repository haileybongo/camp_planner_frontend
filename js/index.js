

document.addEventListener('DOMContentLoaded', () => {


    const navBar = document.querySelector("#navBar")

    navBar.addEventListener("click", (e) =>
    
    navBarHandler(e))

    getItems()


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
            document.getElementById('tripList').innerHTML += newTrip.renderLinks()
              
    }})
    }

function getItems(){
    fetch("http://localhost:3000/api/items")
    .then(response => response.json())
    .then(items => {
        for (const element of items.data){
            new Item(element.id, element.attributes)
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
           
            let newTrip = new Trip(trip.data.id, trip.data.attributes)

            let tripList = Item.findById(newTrip.item.id)
    

            document.getElementById('tripList').innerHTML += newTrip.renderLinks()
            document.getElementById('tripDetails').innerHTML += ""
            document.getElementById('tripDetails').innerHTML += newTrip.renderTripDetails()
            document.getElementById('listItems').innerHTML = tripList.renderList()
        })
        }         

function tripLinkHandler(e){

    e.preventDefault()
    let clickedTrip = Trip.findById(e.target.parentElement.id)

  
    let tripList = Item.findById(clickedTrip.item.id.toString(10))


    document.getElementById('tripDetails').innerHTML = ""
    document.getElementById('tripDetails').innerHTML += clickedTrip.renderTripDetails()
    document.getElementById('listItems').innerHTML = tripList.renderList()

}

function navBarHandler(e){
    button = e.target.innerText


    if (button === "MY TRIPS"){
        document.querySelector("#myTrips").hidden = false;
        getTrips()
        const tripList = document.querySelector("#tripList")
        tripList.addEventListener("click", (e) =>
        tripLinkHandler(e))
    }
    else if (button === "NEW TRIP"){
        document.querySelector("#newForm").hidden = false
        const createTripForm = document.querySelector("#create-trip")
        createTripForm.addEventListener("submit", (e) => 
        createFormHandler(e))

    }
    else if (button === "PACKING LISTS"){
        document.querySelector("#availableLists").hidden = false   
        for (const element of Item.all){
          document.getElementById('listContainer').innerHTML += `<h5 class="tm-color-primary">${element.name}</h5>`
          document.getElementById('listContainer').innerHTML += element.renderList()
          document.getElementById('listContainer').innerHTML += `<br><br>`
      }  
       
    }
    else if (button === "SIGN UP"){
      document.querySelector("#signupForm").hidden = false
      const signupForm = document.querySelector("#signupForm")
      signupForm.addEventListener("submit", (e) => 
      signupFormHandler(e))
    }
    else if (button === "LOG IN"){
      document.querySelector("#loginForm").hidden = false
      const loginForm = document.querySelector("#loginForm")
      loginForm.addEventListener("submit", (e) => 
      loginFormHandler(e))
    }
    else if (button === "LOG OUT"){
      localStorage.removeItem('jwt-token')
      document.documentElement.scrollTop = 0;
      location.reload();
    }
    else if (button === "FIND A CAMPSITE"){
      let searchForm = document.querySelector("#searchForm")
      searchForm.hidden = false
      searchForm.addEventListener("submit", (e) => 
      campFormHandler(e))
    }

}

function campFormHandler(e){
  e.preventDefault()

  let stateCode = document.querySelector("#state").value
  let query = document.querySelector("#query").value
  debugger

  campSearch (stateCode, query)
}

function campSearch (state, query){ 
  fetch("http://developer.nps.gov/api/v1/campgrounds?stateCode="+state+"&q="+query+"&api_key=qblPW1KHLut8x7u6TbqmyIztfGiG59XKDjiYKmBn")
  .then(response => response.json())
  .then(results =>{
      debugger
  } )
}

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
      console.log(user)
      localStorage.setItem('jwt-token', user.jwt)
      document.documentElement.scrollTop = 0;
      location.reload();
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
      document.documentElement.scrollTop = 0;
      location.reload();
  })
}





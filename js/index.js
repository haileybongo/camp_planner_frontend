document.addEventListener('DOMContentLoaded', () => {


    const navBar = document.querySelector("#tmMainNav")

    navBar.addEventListener("click", (e) =>
    
    navBarHandler(e))


   let myTripButton =  document.querySelectorAll("a[href='#trips']")

})

function getTrips() {
    fetch("http://localhost:3000/api/trips")
    .then(response => response.json())
    .then (trips => {
        for (const element of trips.data){    
            let newTrip = new Trip(element.id, element.attributes)
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
            headers:{"Content-Type": "application/json"},
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
    



}

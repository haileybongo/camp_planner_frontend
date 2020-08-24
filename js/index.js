document.addEventListener('DOMContentLoaded', () => {

    getTrips()
    getItems()

    const createTripForm = document.querySelector("#create-trip")

    createTripForm.addEventListener("submit", (e) => 
    createFormHandler(e))

    const tripList = document.querySelector("#tripList")

    tripList.addEventListener("click", (e) =>
    tripLinkHandler(e))


   let myTripButton =  document.querySelectorAll("a[href='#trips']")

})

function getTrips() {
    fetch("http://localhost:3000/api/trips")
    .then(response => response.json())
    .then (trips => {
        for (const element of trips.data){     
            let newTrip = new Trip(element.id, element.attributes)
            new Item(newTrip.item)
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

    document.getElementById('tripDetails').innerHTML += clickedTrip.renderTripDetails()
    document.getElementById('listItems').innerHTML = tripList.renderList()

}

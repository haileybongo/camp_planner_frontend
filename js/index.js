document.addEventListener('DOMContentLoaded', () => {

    getTrips()

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
           
            let newTrip = new Trip(element)
            document.getElementById('tripList').innerHTML += newTrip.renderLinks()
              
    }})
    }

function createFormHandler(e) {
    e.preventDefault()
    console.log(e)
    let locationInput = document.querySelector("#trip-location").value
    let campgroundInput = document.querySelector("#trip-campground").value
    let arrivalInput = document.querySelector("#trip-arrival").value
    let departureInput = document.querySelector("#trip-departure").value
    let packingList = document.querySelector("#packingList").value

    postFetch(locationInput, campgroundInput, arrivalInput, departureInput, packingList)

    
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
            console.log(trip)
        })
        }
        

    
    }


function tripLinkHandler(e){

    e.preventDefault()
    let clickedTrip = Trip.findById(e.target.parentElement.id)

    document.getElementById('tripDetails').innerHTML += clickedTrip.renderTripDetails()

}

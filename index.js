document.addEventListener('DOMContentLoaded', () => {

    getTrips()

    const createTripForm = document.querySelector("#create-trip")

    createTripForm.addEventListener("submit", (e) => 
    createFormHandler(e)
    
    )


   let myTripButton =  document.querySelectorAll("a[href='#trips']")

})

function getTrips() {
    fetch("http://localhost:3000/api/trips")
    .then(response => response.json())
    .then (trips => {
        
        let tripContainer = document.getElementById('tripList')
        for (const element of trips.data){
           
            tripContainer.innerHTML += `<li> ${element.attributes.location}</li>`
        }          
    })
    }

function createFormHandler(e) {
    e.preventDefault()
    console.log(e)
    let locationInput = document.querySelector("#trip-location").value
    let campgroundInput = document.querySelector("#trip-campground").value
    let arrivalInput = document.querySelector("#trip-arrival").value
    let departureInput = document.querySelector("#trip-departure").value

    postFetch(locationInput, campgroundInput, arrivalInput, departureInput)

    
    function postFetch(location, campground, arrival, departure){

        fetch("http://localhost:3000/api/trips", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                location: location,
                campground: campground,
                arrival: arrival,
                departure: departure
            })
        })
        .then(response => response.json())
        .then(trip => {
            console.log(trip)
        })
        }
        

    
    }


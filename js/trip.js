class Trip {
     constructor(dataId, dataAttributes){

         this.id = dataId
         this.location = dataAttributes.location,
         this.campground = dataAttributes.campground,
         this.arrival = dataAttributes.arrival,
         this.departure = dataAttributes.departure
         this.item = dataAttributes.item
         Trip.all.push(this)
        
     }

     renderLinks() {
     
        return    `<li id= "${this.id}"> <a href="">${this.location}</a></li>`     
     }

     renderTripDetails() {
         return `
         <div data-id = ${this.id}>
         <h2 class="tm-section-title tm-color-primary mb-5">${this.location}</h2>
         <p class="mb-5">
           <strong>Campground: </strong> ${this.campground}
           <br>
           <strong>Arriving on </strong>${this.arrival}
           <br>
           <strong>Departing on </strong>${this.departure}
           <br>
           <strong> Packing list: </strong> ${this.item.name}
           <ul id="listItems">
            </ul>
         </p>
         <button type = "button" id="delete_button"> Delete Trip </button>
         </div>
         `
     }

     static findById(id) {
         return this.all.find(trip => trip.id === id)
     }
}

Trip.all = [];


function newTripHandler(e) {
    e.preventDefault()
    let locationInput = document.querySelector("#trip-location").value
    let campgroundInput = document.querySelector("#trip-campground").value
    let arrivalInput = document.querySelector("#trip-arrival").value
    let departureInput = document.querySelector("#trip-departure").value
    let packingList = document.querySelector("#packingList").value

    newTripPostFetch(locationInput, campgroundInput, arrivalInput, departureInput, packingList)

}

function newTripPostFetch(location, campground, arrival, departure, item){

        fetch("http://localhost:3000/api/trips", {
            method: "POST",
            headers:{"Content-Type": "application/json",
            "Credentials": "include",
            "Authorization": `Bearer ${localStorage.getItem('jwt-token')}`},     
            body: JSON.stringify({
                location: location,
                campground: campground,
                arrival: arrival,
                departure: departure,
                item_id: item
            })
        })
        .then(response => response.json())
        .then(trip => {

            document.querySelector("#create-trip").reset();

            let newTrip = new Trip(trip.data.id, trip.data.attributes)

            let tripList = Item.findById(newTrip.item.id.toString(10))


            document.getElementById('tripList').innerHTML = ""
            document.getElementById('tripDetails').innerHTML = ""
            for (const element of Trip.all){   
                document.getElementById('tripList').innerHTML += element.renderLinks()
                  
        }
            document.getElementById('tripDetails').innerHTML += newTrip.renderTripDetails()
            document.getElementById('listItems').innerHTML = tripList.renderList()
            document.getElementById('delete_button').addEventListener("click", (e)=> {
                let tripId = e.target.parentElement.dataset.id;
                 deleteTrip(tripId);
                 getTrips()})

            document.getElementById('tripDetails').scrollIntoView()
        })
        .catch(errors => {
            console.log(errors)
        })
        }
                 

function tripLinkHandler(e){

    e.preventDefault()
    let clickedTrip = Trip.findById(e.target.parentElement.id)
    let tripList = Item.findById(clickedTrip.item.id.toString(10))

    document.getElementById('tripDetails').innerHTML = ""
    document.getElementById('tripDetails').innerHTML += clickedTrip.renderTripDetails()
    document.getElementById('listItems').innerHTML = tripList.renderList()

    document.getElementById('delete_button').addEventListener("click", (e)=> {
        let tripId = e.target.parentElement.dataset.id;
         deleteTrip(tripId);
         getTrips()})


}

function getTrips() {
    fetch("http://localhost:3000/api/trips", {
        method:"GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem('jwt-token')}`
        }
    })
    .then(response => response.json())
    .then (trips => {

        document.getElementById('tripList').innerHTML = ""
        for (const element of trips.data){ 
            let findTrip = Trip.findById(element.id.toString(10)) 
            if (findTrip != null ){
                
                document.getElementById('tripList').innerHTML += findTrip.renderLinks()
            }else {
               
            let newTrip = new Trip(element.id, element.attributes)

            document.getElementById('tripList').innerHTML += newTrip.renderLinks()
            }
              
    }})
    }

function deleteTrip(id) {
    fetch("http://localhost:3000/api/trips/" + `${id}`, {
        method:"DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem('jwt-token')}`
        }
    })
    .then(response => {
        Trip.all = [];
        document.getElementById('tripDetails').innerHTML = ""
        getTrips()})

    }


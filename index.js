document.addEventListener('DOMContentLoaded', () => {

    getTrips()


   let myTripButton =  document.querySelectorAll("a[href='#trips']")

})

function getTrips() {
    fetch("http://localhost:3000/api/trips")
    .then(response => response.json())
    .then (trips => {
        
        let tripContainer = document.getElementById('tripList')
        for (const element of trips.data){
            debugger
            tripContainer.innerHTML += `<li> ${element.attributes.location}</li>`


        }
        
    })
}
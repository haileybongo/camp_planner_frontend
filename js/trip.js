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
           Campground: ${this.campground}
           <br>
           Arriving on ${this.arrival}
           <br>
           Departing on ${this.departure}
           <br>
           Packing list: ${this.item.name}
           <ul id="listItems">
            </ul>
         </p>
         `
     }

     static findById(id) {
         return this.all.find(trip => trip.id === id)
     }
}

Trip.all = [];
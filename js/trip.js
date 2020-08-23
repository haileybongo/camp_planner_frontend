class Trip {
     constructor(data){
         this.id = data.id
         this.location = data.attributes.location,
         this.campground = data.attributes.campground,
         this.arrival = data.attributes.arrival,
         this.departure = data.attributes.departure
         this.item = data.attributes.item
         Trip.all.push(this)
        
     }

     renderLinks() {
     
        return    `<li id= "${this.id}"> <a href="">${this.location}</a></li>`     
     }

     renderTripDetails() {
         return `
         <div><i class="far fa-6x fa-building mb-5 tm-section-icon"></i></div>
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
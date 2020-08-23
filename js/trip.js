class Trip {
     constructor(data){
         this.id = data.id
         debugger
         this.location = data.attributes.location,
         this.campground = data.attributes.campground,
         this.arrival = data.attributes.arrival,
         this.departure = data.attributes.departure
     }

     static findById(id) {
         return this.all.find(trip => trip.id === id)
     }
}
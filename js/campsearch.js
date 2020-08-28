
function campFormHandler(e){
    e.preventDefault()
  
    let parkCode = document.querySelector("#parkCode").value
  
    campSearch (parkCode)
  }
  
  function campSearch (parkCode){ 
    fetch("http://developer.nps.gov/api/v1/campgrounds?parkCode="+parkCode+"&api_key=qblPW1KHLut8x7u6TbqmyIztfGiG59XKDjiYKmBn")
    .then(response => response.json())
    .then(results =>{
       
        let resultContainer = document.getElementById('resultContainer')
        document.getElementById("searchResults").hidden = false

        resultContainer.innerHTML = ""
  
        for(const element of results.data){

          

          if (element.url != ""){
              
  
          resultContainer.innerHTML +=
          `<p>
          <h4><a href = ${element.url}> ${element.name}</a></h4>`

          } else if (element.reservationUrl != "") {
            resultContainer.innerHTML +=
            `<p>
            <h4><a href = ${element.reservationUrl}> ${element.name}</a></h4>`
          } else {
            resultContainer.innerHTML +=
            `<p>
            <h4> ${element.name} </h4>`
          }

          if (element.addresses != "" && element.addresses.city != "") {
              resultContainer.innerHTML +=
          `
          ${element.addresses[0].city}
          <br><br>`}

          if (element.hasOwnProperty("description")){ 
        resultContainer.innerHTML +=         
          `<h5> Description</h5>
          ${element.description}
          <br><br>`
          }

          resultContainer.innerHTML += `</p>`
        
    } })
  }
  
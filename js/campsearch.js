
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
  
        for(const element of results.data){
  
          resultContainer.innerHTML +=
          `<p>
          <h4><a href = ${element.url}> ${element.name}</a></h4>
          ${element.addresses[0].city}
          <br><br>
          <h5> Description</h5>
          ${element.description}
          <br><br>
  
  
          </p>`
        }
    } )
  }
  
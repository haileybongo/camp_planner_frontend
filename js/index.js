

document.addEventListener('DOMContentLoaded', () => {


    const navBar = document.querySelector("#navBar")

    navBar.addEventListener("click", (e) =>
    
    navBarHandler(e))

    getItems()


   if (localStorage.getItem('jwt-token') === null){
    document.getElementById("tmMainNav").hidden = true;
    document.getElementById("loginNav").hidden = false;
    document.getElementById("preLoginAbout").hidden = false;
    document.getElementById("postLoginAbout").hidden = true;
   } else{
    document.getElementById("tmMainNav").hidden = false;
    document.getElementById("loginNav").hidden = true;
    document.getElementById("preLoginAbout").hidden = true
    document.getElementById("postLoginAbout").hidden = false;
   }

})




function navBarHandler(e){
    button = e.target.innerText


    if (button === "MY TRIPS"){
        document.querySelector("#myTrips").hidden = false;
        getTrips()
        const tripList = document.querySelector("#tripList")
        tripList.addEventListener("click", (e) =>
        tripLinkHandler(e))
    }
    else if (button === "NEW TRIP"){
        document.querySelector("#newForm").hidden = false
        const createTripForm = document.querySelector("#create-trip")
        createTripForm.addEventListener("submit", (e) => 
        newTripHandler(e))

    }
    else if (button === "PACKING LISTS"){
        document.querySelector("#availableLists").hidden = false   
        for (const element of Item.all){
          document.getElementById('listContainer').innerHTML += `<h5 class="tm-color-primary">${element.name}</h5>`
          document.getElementById('listContainer').innerHTML += element.renderList()
          document.getElementById('listContainer').innerHTML += `<br><br>`
      }  
       
    }
    else if (button === "SIGN UP"){
      document.querySelector("#signupForm").hidden = false
      const signupForm = document.querySelector("#signupForm")
      signupForm.addEventListener("submit", (e) => 
      signupFormHandler(e))
    }
    else if (button === "LOG IN"){
      document.querySelector("#loginForm").hidden = false
      const loginForm = document.querySelector("#loginForm")
      loginForm.addEventListener("submit", (e) => 
      loginFormHandler(e))
    }
    else if (button === "LOG OUT"){
      localStorage.removeItem('jwt-token')
      document.documentElement.scrollTop = 0;
      location.reload();
    }
    else if (button === "FIND A CAMPSITE"){
      let searchForm = document.querySelector("#searchForm")
      searchForm.hidden = false
      searchForm.addEventListener("submit", (e) => 
      campFormHandler(e))
    }

}




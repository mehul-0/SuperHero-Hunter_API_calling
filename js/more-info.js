// Selecting the elements from the DOM
let info = document.getElementById('info-container');
let title = document.getElementById('page-title');

// getting the heroInfo object which was stored when the user clicked on more info
let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));

// Changing the title of the page according to the characters name
title.innerHTML = heroInfo.name + " | SH";

window.addEventListener("load", function () {
     // getting the favouritesCharacterIDs for displaying the appropriate button accoring to the existance of character in favourites
     let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
     if (favouritesCharacterIDs == null) {
          favouritesCharacterIDs = new Map();
     } else if (favouritesCharacterIDs != null) {
          favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     }

     // adding the information into DOM 
     info.innerHTML =
              `<div class="flex-row hero-name">${heroInfo.name}</div>
               <div class="flex-row hero-img-and-more-info">
                    <img id="portraitImage" class="hero-img" src="${heroInfo.portraitImage}" alt="">
                    <img style="display:none;" id="landscapeImage" src="${heroInfo.landscapeImage}" alt="">
                    <div class="flex-col more-info">
                         <div class="flex-row id">
                              <b>ID:</b><span>${heroInfo.id}</span>
                         </div>
                         <div class="flex-row comics">
                              <b>Comics:</b><span>${heroInfo.comics}</span>
                         </div>
                         <div class="flex-row series">
                              <b>Series:</b><span>${heroInfo.series}</span>
                         </div>
                         <div class="flex-row stories">
                              <b>Stories:</b><span>${heroInfo.stories}</span>
                         </div>
                    </div>
               </div>
               <div class="flex-col hero-discription">
                    <b>Discription:</b>
                    <p>${heroInfo.description != "" ? heroInfo.description : "No Description Available"}</p>
               </div>
               <div style="display:none;">
                    <span>${heroInfo.name}</span>
                    <span>${heroInfo.portraitImage}</span>
                    <span>${heroInfo.landscapeImage}</span>
                    <span>${heroInfo.id}</span>
                    <span>${heroInfo.comics}</span>
                    <span>${heroInfo.series}</span>
                    <span>${heroInfo.stories}</span>
                    <span>${heroInfo.squareImage}</span>
                    <span>${heroInfo.description}</span>
               </div>
               <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${heroInfo.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}`
     // Calling the function so that event is added
     addEvent();
})

// Changing the character image based on the different screen sizes 
// landscape image for small screen size and potrait image for bigger screen sizes
window.addEventListener('resize', function () {
     let portraitImage = document.getElementById('portraitImage');
     let landscapeImage = document.getElementById('landscapeImage');

     if (document.body.clientWidth < 678) {
          portraitImage.style.display = "none";
          landscapeImage.style.display = "block";
     } else {
          landscapeImage.style.display = "none";
          portraitImage.style.display = "block";
     }
})

// this function would run after content of the page is loaded
function addEvent() {
     let favouriteButton = document.querySelector('.add-to-fav-btn');
     favouriteButton.addEventListener("click", addToFavourites);
}


function addToFavourites() {
     if (this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites') {

          // We cretate a new object containg revelent info of hero and push it into favouritesArray
          let heroInfo = {
               name: this.parentElement.children[3].children[0].innerHTML,
               description: this.parentElement.children[3].children[8].innerHTML,
               comics: this.parentElement.children[3].children[4].innerHTML,
               series: this.parentElement.children[3].children[5].innerHTML,
               stories: this.parentElement.children[3].children[6].innerHTML,
               portraitImage: this.parentElement.children[3].children[1].innerHTML,
               id: this.parentElement.children[3].children[3].innerHTML,
               landscapeImage: this.parentElement.children[3].children[2].innerHTML,
               squareImage: this.parentElement.children[3].children[7].innerHTML
          }

          // getting the favourites array which stores objects of character  
          // We get null is no such array is created earlier i.e user is running the website for the first time
          let favouritesArray = localStorage.getItem("favouriteCharacters");

          // If favouritesArray is null (for the first time favourites array is null)
          if (favouritesArray == null) {
               // favourites array is null so we create a new array
               favouritesArray = [];
          } else {
               // if it is not null then we parse so that it becomes an array 
               favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          }

          // favouritesCharacterIDs is taken from localStorage for adding ID of the character which is added in favourites
          let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

          
          if (favouritesCharacterIDs == null) {
               favouritesCharacterIDs = new Map();
          } else {
               favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
          }

          favouritesCharacterIDs.set(heroInfo.id, true);
          
          favouritesArray.push(heroInfo);

          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));

          this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';
          
          document.querySelector(".fav-toast").setAttribute("data-visiblity","show");
          // Deleting the "Added to Favourites" toast from DOM after 1.5 seconds
          setTimeout(function(){
               document.querySelector(".fav-toast").setAttribute("data-visiblity","hide");
          },1500);
     }
     // For removing the character form favourites array
     else{
          
          // storing the id of character in a variable 
          let idOfCharacterToBeRemoveFromFavourites = this.parentElement.children[3].children[3].innerHTML;
          
          let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          
          let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
          
          let newFavouritesArray = [];
          
          // deleting the character from map using delete function where id of character acts as key
          favouritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavourites}`);
          
          // creating the new array which does not include the deleted character
          // iterating each element of array
          favouritesArray.forEach((favourite) => {
               // if the id of the character doesn't matches the favourite (i.e a favourite character) then we append it in newFavourites array 
               if(idOfCharacterToBeRemoveFromFavourites != favourite.id){
                    newFavouritesArray.push(favourite);
               }
          });
          
          
          // Updating the new array in localStorage
          localStorage.setItem("favouriteCharacters",JSON.stringify(newFavouritesArray));
          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          
          
          this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';
          
          document.querySelector(".remove-toast").setAttribute("data-visiblity","show");
          // Deleting the "Remove from Favourites" toast from DOM after 1.5 seconds
          setTimeout(function(){
               document.querySelector(".remove-toast").setAttribute("data-visiblity","hide");
          },1500);
     }     
}



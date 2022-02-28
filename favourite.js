var favouritecontainer = document.getElementById("display-favourites");
var arrfavorites = localStorage.getItem('arrfavourites');
var  displayArr = [];

var heroID = "";
var heroName = "";
function addHeroIdToLocal(hero_id){
    localStorage.setItem('heroid', hero_id);
}

function removeFromfavorites(hero_id){
    var indexdisplayArr=displayArr.indexOf(hero_id);
    displayArr.splice(indexdisplayArr,1);
    let mid = document.getElementById(hero_id);
    console.log(mid);
    mid.parentNode.removeChild(mid);
    console.log(mid);
    localStorage.setItem('arrfavourites',displayArr);
    if(displayArr==null || displayArr.length==0){
        arrfavorites = [];
        localStorage.setItem('arrfavorites', arrfavorites);
        let html = `<div style="width:100%;text-align:center"><h1 style="color:white">You Don't have any favorites yet.....!</h1></div>`;
        favouritecontainer.innerHTML = html;
        localStorage.clear();
    }
}

function favoriteItemsPage(){
    if(arrfavorites==null||arrfavorites.length==0){
        let html = `<div style="width:100%;text-align:center"><h1 style="color:white">You Don't have any favorites yet.....!</h1></div>`;
        favouritecontainer .innerHTML = html;
    }
    else
    {
        // let hero_id = "";
        for(let data of arrfavorites){
            if(data!=',')
            displayArr.push(parseInt(data));
        }
        
        let html = "";
        for(let heroId of displayArr){
            fetch(`https://www.superheroapi.com/api.php/3328323083897178/${heroId}`)
            .then((res) => res.json())
            .then((data) =>{
                console.log(data);
                
                html += `
                    <div class="card" id = "${data.id}" style="margin-left:4%;width: 18rem; margin:3%; border-radius: 30px; overflow:hidden;border:5px solid white">
                    <img src="${data.image.url}" class="card-img-top" alt="Image not fetched">
                    <div class="card-body" style="text-align:center">
                      <h5 class="card-title">${data.name}</h5>
                      <a href="details.html" id = "show-more" onclick="return addHeroIdToLocal(${data.id})" class="btn btn-primary">See More Details</a>
                      <button type="submit" onclick = "removeFromfavorites(${data.id})" class="btn btn-primary" style="margin-top: 3%; ">Remove From Favorites</button>
                    </div>
                  </div>
                `;
                favouritecontainer.innerHTML = html;
            });
           
        }
        
    
    }
}

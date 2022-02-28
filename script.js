var search_input = document.getElementById('searchbar');
var showingresults = document.getElementById('display-search-results');
var arr = [];
search_input.addEventListener("keypress", e => {
    setTimeout(() => getElement(search_input.value), 0);
});
// in this function we are adding the item into localStorage
function addtofavourites(heroId,heroname) {
    if(document.getElementById(heroId).innerHTML=='Add To Favourites'){  //if we are clicking on it first time,then the item will be loaded  
        document.getElementById(heroId).innerHTML='Added To Favourites'; //changing from add to added
        arr=[];
        if(localStorage.arrfavourites){
        for(let data of localStorage.getItem('arrfavourites')){  //pushing the data into array when we reload the page 
            if(data!=',')
                arr.push(parseInt(data));
        }
    }
        arr.push(heroId);   //pushing the current element
        localStorage.setItem('arrfavourites', arr);  //pushing the arr data to localstorage
        alert(`Your ${heroname} Successfully add to favorites`);
    }
    else{
        document.getElementById(heroId).innerHTML='Add To Favourites';
        arr=[];
        for(i=0;i<localStorage.getItem('arrfavourites').length;i++){
            if(localStorage.arrfavourites[i]!=',')
                arr.push(parseInt(localStorage.arrfavourites[i]));
        }
        var indexArr=arr.indexOf(heroId);
        arr.splice(indexArr,1);       //removing it from array 
        localStorage.setItem('arrfavourites', arr);
        alert(`Your ${heroname} Successfully removed from favorites`);
    }
    
}
//storing heroid for details page
function addSuperHeroToLocal(heroid) {
    localStorage.setItem('heroid', heroid);
}
//this function will invoke when we press key and give us data according to searched value
function getElement(searchvalue) {
    console.log(searchvalue);
    fetch(`https://www.superheroapi.com/api.php/3328323083897178/search/${searchvalue}`)
        .then(res => res.json())
        .then(data => {
            let innerdata = "";
            var isFav = false;

            if (data.results) {
                data.results.forEach(result => {
                    innerdata += `
                <div class="card"  style="background:cyan;border:4px solid black;width:20rem;margin-bottom:3%;overflow:hidden;height:13%">
                
                <img src="${result.image.url}" class="card-img-top" alt="Photo cannot be fetched" style="width:340px;height:300px;>
                    <div class="card-body" >
                       <h5 class="card-title" style="text-align:center">${result.name}</h5>`;
                      //this is mainly done for the purpose when we reload the page it gives us the matching data 
                       if(localStorage.arrfavourites){
                           for(a=0;a<localStorage.arrfavourites.length;a++){
                               if(localStorage.arrfavourites[a]==result.id)
                               {
                                innerdata +=`<p id="${result.id}" onclick="return addtofavourites(${result.id},'${result.name}')"class="btn btn-primary" style="text-align:center;width:13rem;margin-left:17%">Added To Favourites</p>`
                                isFav = true;
                               }                            
                           }
                           if(isFav == false)
                           {
                            innerdata +=`<p id="${result.id}" onclick="return addtofavourites(${result.id},'${result.name}')"class="btn btn-primary" style="text-align:center;width:13rem;margin-left:17%">Add To Favourites</p>`
                           }
                           isFav = false;
                       }
                       else{
                        innerdata +=`<p id="${result.id}" onclick="return addtofavourites(${result.id},'${result.name}')"class="btn btn-primary" style="text-align:center;width:13rem;margin-left:17%">Add To Favourites</p>`
                       }
                       innerdata +=`<a href="details.html" id = "show-more" onclick="return addSuperHeroToLocal(${result.id})" class="btn btn-primary" style="width:10rem;margin-left:25%">See More Details</a>
                    </div>                    
            </div>`;
                })
            } else {
                innerdata = `<h2>Didnt find anything related to ${searchvalue}</h2>`;
            }
            showingresults.innerHTML = innerdata;
        })

}

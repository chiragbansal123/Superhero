var imgContainer=document.getElementById('imgContainer');
var infocontainer=document.getElementById('detailsContainer');
var heroId=localStorage.getItem('heroid');
function detailsPage(){
    fetch(`https://www.superheroapi.com/api.php/3328323083897178/${localStorage.heroid}`)
    .then(res => res.json())
    .then(data =>{
        console.log(heroId);
        let imgdata="";
        let infodata="";
        imgdata+=`
        
        <img class="card-img-top" src="${data.image.url}" alt="Image not fetched" style="margin-top:-0.1rem;margin-left:-0.1rem;width:16rem;height:14rem;border-radius:10%">
        <h5 style="text-align:center;margin-top:1%">${data.name}</h5>
        `
        infodata+=`
        
        <div class="detail-item">

                        <!-- Powerstats bars -->
                        <span class="anchor" id="powerstats"></span>
                        <h1 id="powerstats">Powerstats</h1>
                        <div id="stats-container">
                            <div id="stat-names">
                                <span>Combat</span>
                                <span>Durability</span>
                                <span>Intelligence</span>
                                <span>Power</span>
                                <span>Speed</span>
                                <span>Strength</span>
                            </div>

                            <div id="stat-bars">
                                <div class="bar-container">
                                    <div class="bar combat" style="width:${data.powerstats.combat}%">${data.powerstats.combat}</div>
                                </div>
                                <div class="bar-container">
                                    <div class="bar durability" style="width:${data.powerstats.durability}%;">${data.powerstats.durability}</div>
                                </div>
                                <div class="bar-container">
                                    <div class="bar intelligence" style="width:${data.powerstats.intelligence}%;">${data.powerstats.intelligence}</div>
                                </div>
                                <div class="bar-container">
                                    <div class="bar power" style="width: ${data.powerstats.power}%;">${data.powerstats.power}</div>
                                </div>
                                <div class="bar-container">
                                    <div class="bar speed" style="width: ${data.powerstats.speed}%;">${data.powerstats.speed}</div>
                                </div>
                                <div class="bar-container">
                                    <div class="bar strength" style="width: ${data.powerstats.strength}%;">${data.powerstats.strength}</div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="detail-item">
                    <span class="anchor" id="appearance-target"></span>
                    <h1>Appearance</h1>
                    <section id="appearance"><p><b>Gender</b> : ${data.appearance.gender}</p><p><b>Race</b> : ${data.appearance.race}</p><p><b>Height</b> : ${data.appearance.height}</p><p><b>Weight</b> :${data.appearance.weight}</p><p></section>
                    </div>
                    <div class="detail-item">
                        <span class="anchor" id="biography-target"></span>
                        <h1>Biography</h1>
                        <section id="biography"><p><b>Full-name</b> :${data.biography['full-name']}</p><p><b>Alter-egos</b> : ${data.biography['alter-egos']}</p><p><b>Aliases</b> :${data.biography.aliases} </p><p><b>Place-of-birth</b> : ${data.biography['place-of-birth']}</p><p><b>First-appearance</b> : ${data.biography['first-appearance']}</p><p><b>Publisher</b> : ${data.biography.publisher}</p><p><b>Alignment</b> : ${data.biography.alignment}</p></section>
                    </div>
                </div>
        
        
        
        
        

        
        
        `
        imgContainer.innerHTML=imgdata;
        infocontainer.innerHTML=infodata;
        localStorage.heroid="";
        


    })

}


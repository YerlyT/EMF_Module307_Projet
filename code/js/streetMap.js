class streetMap{
  constructor(){
   

  }

  

  initialiserCarte(id) {

    mapid = L.map("mapid").setView([-33.85690535797353, 151.2153662901801], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapid);
  }
}


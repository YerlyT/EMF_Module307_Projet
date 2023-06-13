/*
  But : création de la map et des marqueurs
  Auteur : Tom yerly
  Date :   13.06.2023
*/
mapid = "";
class streetMap{
  constructor(){
  }
  initialiserCarte(id) {

    //crée la carte au bon endroit
    mapid = L.map(id[0]).setView([35.2465334, -116.7666609], 5);

    //ajoute les informations en bas a droite
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapid);


    //crée les marqueurs
    let marker = L.marker([25.9951, -97.1542]).addTo(mapid);
    marker.bindPopup("SpaceX South Texas Launch Site", { offset: [0, -30] }).openPopup();

    mapid.setView([35.2465334, -116.7666609], 6);

    marker = L.marker([35.2465334, -116.7666609]).addTo(mapid);
    marker.bindPopup("Base de la Nasa", { offset: [0, -30] }).openPopup();

  }

}


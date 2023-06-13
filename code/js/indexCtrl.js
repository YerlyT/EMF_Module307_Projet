/*
  But :     
  Auteur : prénom + nom
  Date :   jj.mm.aaaa / V1.0
*/

$().ready(function () {
  // service et indexCtrl sont des variables globales qui doivent être accessible depuis partout => pas de mot clé devant ou window.xxx
  http = new HttpService();
  indexCtrl = new IndexCtrl(); // ctrl principal
  map = new streetMap();
  http.centraliserErreurHttp(indexCtrl.afficherErreurHttp);
});

class IndexCtrl {
  constructor() {
    this.vue = new VueService();
    this.loadAccueil();
  }

  afficherErreurHttp(msg) {
    alert(msg);
  }

  loadAccueil() {
    this.vue.chargerVue("accueil");
  }

  loadMars() {
    this.vue.chargerVue("mars", this.ctrlgetImgMars());
  }

  loadSources() {
    this.vue.chargerVue("sources", function () {});
  }

  loadAsteroides() {
    this.vue.chargerVue("asteroides", this.ctrlGetAstero());
  }

  loadMap() {
    this.vue.chargerVue("map", function() {});
  }

  ctrlGetAstero() {
    http.getAstero((data) => {
      let infos = "";
      let date = this.getDateFormatted();
      const asteros = data.near_earth_objects[date];
     
        for (const astero in asteros) {
          let dangereux = "Oui";

          if (asteros[astero].is_potentially_hazardous_asteroid == false) {
            dangereux = "Non";
        }

        infos +="<li class='asteroide'><p>" + asteros[astero].name +"</p><button class='arrow-button' onclick='indexCtrl.afficheCache("+ astero +"); return false;' >Voir plus<span class='arrow'></span></button>";

        infos+= "<li><ul class='ul' id='id"+ astero + "'><li class='asteroide2'>Potentiellement dangereux : " + dangereux + "</li>";
        infos+= "<li class='asteroide2'>Taille estimée : " + asteros[astero].estimated_diameter["meters"].estimated_diameter_max +" M </li>";
        infos+= "<li class='asteroide2'>Magnitude : " + asteros[astero].absolute_magnitude_h + " ML</li>";
        infos+= "<li class='asteroide2'>Nasa url : <a href=" + asteros[astero].nasa_jpl_url + ">" + asteros[astero].nasa_jpl_url + "</a></li></ul></li></li>";

        
      }
      $("#lst").append(infos);
      $(".ul").hide();
    });
  }

  afficheCache(nb){
    $("#id"+nb).toggle();
  }

  getDateFormatted() {
    let date = new Date();

    // Récupération des composants de la date
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro devant le mois si nécessaire
    let day = ("0" + date.getDate()).slice(-2); // Ajoute un zéro devant le jour si nécessaire

    return year + "-" + month + "-" + day;
  }

  ctrlgetImgMars() {
    http.getImgMars((data) => {
      let retour = "<div class='imgs'>";
        for (let i = 0; i < data["latest_photos"].length; i++) {
            retour += "<a href='"+ data["latest_photos"][i].img_src + "' ><img id='myImg' src='" + data["latest_photos"][i].img_src + "'/></a>";
          } 
          retour += "</div>";
          $("#photos").append(retour);
    });
  }

}

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
      let nom = "";
      let date = this.getDateFormatted();
      const asteros = data.near_earth_objects[date];
     
        for (const astero in asteros) {
          let dangereux = "oui";

          if (asteros[astero].is_potentially_hazardous_asteroid == false) {
            dangereux = "non";
        }

        nom +="<li class='asteroide'><p>" + asteros[astero].name +"</p><button class='arrow-button' onclick='indexCtrl.afficheCache()' >Voir plus<span class='arrow'></span></button>";

        nom+= "<br><ul class='ul'><li class='asteroide'>Potentiellement dangereux :" + dangereux + "</li>";
        nom+= "<li class='asteroide'>Taille estimée :" + asteros[astero].estimated_diameter["meters"].estimated_diameter_max +"M </li>";
        nom+= "<li class='asteroide'>Magnitude :" + asteros[astero].absolute_magnitude_h + "</li>";
        nom+= "<li class='asteroide'>Nasa url :<a href=" + asteros[astero].nasa_jpl_url + ">" + asteros[astero].nasa_jpl_url + "</a></li></ul>";

        
      }
      $("#lst").append(nom);
      $(".ul").hide();
    });
  }

  afficheCache(){
    $(".ul").toggle();
  }

  getDateFormatted() {
    let date = new Date();

    // Récupération des composants de la date
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro devant le mois si nécessaire
    var day = ("0" + date.getDate()).slice(-2); // Ajoute un zéro devant le jour si nécessaire

    return year + "-" + month + "-" + day;
  }

  ctrlgetImgMars() {
    http.getImgMars((data) => {
      let retour = "";
        for (let i = 0; i < data["latest_photos"].length; i++) {
          retour += "<img src='" + data["latest_photos"][i].img_src + "'/>";
      }
      $("#photos").append(retour);
    });
  }

}

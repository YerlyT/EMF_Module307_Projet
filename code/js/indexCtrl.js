/*
  But : Controleur du projet 
  Auteur : Tom yerly
  Date :   13.06.2023
*/

$().ready(function () {
  // variables globlales nécéssaires pour le bon déroulement du projet
  http = new HttpService();
  indexCtrl = new IndexCtrl(); // ctrl principal
  map = new streetMap();
  http.centraliserErreurHttp(indexCtrl.afficherErreurHttp);
});

//classe indexCtrl
class IndexCtrl {
  constructor() {
    //crée une nouvelle vue et appelle la méthode loadacceuil
    this.vue = new VueService();
    this.loadAccueil();
  }

  //affiche une erreur en cas de problème avec la requête 
  afficherErreurHttp(msg) {
    alert(msg);
  }

  //charge la vue demandée
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


  //Récupere la liste des astéroides de via http.getAstero
  ctrlGetAstero() {
    http.getAstero((data) => {

      //création de variables nécéssaire pour les filtre et les informations de retour
      let infos = "";
      let date = this.getDateFormatted();
      //filtre les asteroides du jour
      const asteros = data.near_earth_objects[date];
     

        for (const astero in asteros) {
          let dangereux = "Oui";

           //determine si l'asteroide est dangereu
          if (asteros[astero].is_potentially_hazardous_asteroid == false) {
            dangereux = "Non";
          }

          //création de la liste d'astéroides
          infos +="<li class='asteroide'><p>" + asteros[astero].name +"</p><button class='arrow-button' onclick='indexCtrl.afficheCache("+ astero +"); return false;' >Voir plus<span class='arrow'></span></button>";
          infos+= "<li><ul class='ul' id='id"+ astero + "'><li class='asteroide2'>Potentiellement dangereux : " + dangereux + "</li>";
          infos+= "<li class='asteroide2'>Taille estimée : " + asteros[astero].estimated_diameter["meters"].estimated_diameter_max +" M </li>";
          infos+= "<li class='asteroide2'>Magnitude : " + asteros[astero].absolute_magnitude_h + " ML</li>";
          infos+= "<li class='asteroide2'>Nasa url : <a href=" + asteros[astero].nasa_jpl_url + ">" + asteros[astero].nasa_jpl_url + "</a></li></ul></li></li>";

        
      }

      //Ajoute la liste à la vue et la chage les informations supplémentaires
      $("#lst").append(infos);
      $(".ul").hide();
    });
  }

  //méthode qui sera executé par les boutons de notre liste
  afficheCache(nb){
    $("#id"+nb).toggle();
  }

  //formatte la date
  getDateFormatted() {
    let date = new Date();

    // Récupération des composants de la date
    let year = date.getFullYear();
    // Ajoute un zéro devant le mois si nécessaire
    let month = ("0" + (date.getMonth() + 1)).slice(-2); 
    // Ajoute un zéro devant le jour si nécessaire
    let day = ("0" + date.getDate()).slice(-2); 

    return year + "-" + month + "-" + day;
  }

  //recupere la liste des images de mars via http.getImgMars
  ctrlgetImgMars() {
    http.getImgMars((data) => {
      //crée la variable qui contiendra les informations à ajouter
      let retour = "<div class='imgs'>";
      //Crée la liste d'image
        for (let i = 0; i < data["latest_photos"].length; i++) {
            retour += "<a target='_blank' href='"+ data["latest_photos"][i].img_src + "' ><img id='myImg' src='" + data["latest_photos"][i].img_src + "'/></a>";
          } 
          retour += "</div>";
          //ajoute la liste au contenu
          $("#photos").append(retour);
    });
  }

}

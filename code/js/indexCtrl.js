/*
  But :     
  Auteur : prénom + nom
  Date :   jj.mm.aaaa / V1.0
*/

$().ready(function () {
  // service et indexCtrl sont des variables globales qui doivent être accessible depuis partout => pas de mot clé devant ou window.xxx
  http = new HttpService();
  indexCtrl = new IndexCtrl(); // ctrl principal
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

  // avec function classique
  loadAccueil() {
    this.vue.chargerVue("accueil");
  }

  loadMeteo() {
    this.vue.chargerVue("meteo", function () {});
  }

  loadSources() {
    this.vue.chargerVue("sources", function () {});
  }

  loadAsteroides() {
    this.vue.chargerVue("asteroides", this.ctrlGetAstero());
  }

  ctrlGetAstero() {
    http.getAstero((data) => {
      let retour = "";

      let date = this.getDateFormatted();

      const asteros = data.near_earth_objects[date];
      if (asteros.length > 0) {
        for (let i = 0; i < asteros.length; i++) {
          retour += "<li class='asteroide'>Nom :" + asteros[i].name + " taille estimée : " + asteros[i].estimated_diameter["meters"].estimated_diameter_max + "M" + "</li>";
        }
      }

      $("#lst").append(retour);
    });
  }

  getDateFormatted() {
    let date = new Date();

    // Récupération des composants de la date
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro devant le mois si nécessaire
    var day = ("0" + date.getDate()).slice(-2); // Ajoute un zéro devant le jour si nécessaire

    return year + "-" + month + "-" + day;
  }
}

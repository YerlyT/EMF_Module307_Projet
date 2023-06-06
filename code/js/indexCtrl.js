/*
  But :     
  Auteur : prénom + nom
  Date :   jj.mm.aaaa / V1.0
*/

$().ready(function () {
  // service et indexCtrl sont des variables globales qui doivent être accessible depuis partout => pas de mot clé devant ou window.xxx
  http = new HttpService();
  indexCtrl = new IndexCtrl();  // ctrl principal
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

  // avec arrow function
  loadLogin() {
    this.vue.chargerVue("login", () =>  new LoginCtrl());
  }

  // avec function classique
  loadAccueil() {
    this.vue.chargerVue("accueil", function() {});
  }

  loadMeteo() {
    this.vue.chargerVue("meteo", function() {});
  }

  loadSources() {
    this.vue.chargerVue("meteo", function() {});
  }

  loadAsteroides() {
    this.vue.chargerVue("asteroides", () => function(){
        this.http.getAstero();
    });
  }
}

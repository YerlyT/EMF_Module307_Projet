/*
 * Couche de services HTTP (worker). 
 *
 * @author Jean-Claude Stritt / modif P-A Mettraux
 */
class VueService {
  constructor() {}

    chargerVue(vue, callback) {

    // charger la vue demandee
    $("#view").load("views/" + vue + ".html", function () {

      // si une fonction de callback est spécifiée, on l'appelle ici
      if(vue == "map"){
        this.mapElement = $("#carte");
        map.initialiserCarte(this.mapElement);
      } else if (typeof callback !== "undefined") {
        callback();
      }

    });
  }

}

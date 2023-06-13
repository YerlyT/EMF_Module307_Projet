/*
 * Couche de services HTTP (worker). 
 *
 * @author Jean-Claude Stritt / modif P-A Mettraux
 */
/*
  But : affichage de la vue demandée
  Auteur : Tom yerly
  Date :   13.06.2023
*/

class VueService {
  constructor() {}

    chargerVue(vue, callback) {

    // charger la vue demandee
    $("#view").load("views/" + vue + ".html", function () {

      //Création de la carte si map.html est appelée
      if(vue == "map"){
        this.mapElement = $("#mapid");
        if(this.mapElement.length > 0){
          map.initialiserCarte(this.mapElement);
        }
      // si une fonction de callback est spécifiée, on l'appelle ici
      } else if (typeof callback !== "undefined") {
        callback();
      }

    });
  }

}

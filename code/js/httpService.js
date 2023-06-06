/*
 * Couche de services HTTP (worker). 
 *
 * @author Jean-Claude Stritt / modif P-A Mettraux
 */
class HttpService {
  constructor() {}

  /*
  **  $.ajaxSetup permet de définir une fois un élément sans le refaire par la suite. Ici cela se fait l'error
  */
  centraliserErreurHttp(httpErrorCallbackFn) {
    $.ajaxSetup({
      error: function (xhr, exception) {
        let msg;
        if (xhr.status === 0) {
          msg = "Pas d'accès à la ressource serveur demandée !";
        } else if (xhr.status === 404) {
          msg = "Page demandée non trouvée [404] !";
        } else if (xhr.status === 500) {
          msg = "Erreur interne sur le serveur [500] !";
        } else if (exception === "parsererror") {
          msg = "Erreur de parcours dans le JSON !";
        } else if (exception === "timeout") {
          msg = "Erreur de délai dépassé [Time out] !";
        } else if (exception === "abort") {
          msg = "Requête Ajax stoppée !";
        } else {
          msg = "Erreur inconnue : \n" + xhr.responseText;
        }
        httpErrorCallbackFn(msg);
      },
    });
  }

  /*
  */
  getAstero() {
	// Uploade votre propre fichier PHP et adaptez l'URL ci-dessous.
  var settings = {
    "url": "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=THWLKdcvg1kZcPqb8BbDNDOjR7cnYNAKYYvjFdFh",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "api_key": "THWLKdcvg1kZcPqb8BbDNDOjR7cnYNAKYYvjFdFh",
      "Cookie": "JSESSIONID=5FFEFB61C7CEBA0B2442E3F7070BDBC8; __VCAP_ID__=0ec1d850-65b2-40d6-59a6-c111"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  }
}

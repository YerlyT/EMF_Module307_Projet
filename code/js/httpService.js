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
  getAstero(successCallBack) {
	// Uploade votre propre fichier PHP et adaptez l'URL ci-dessous.
  let url = "https://api.nasa.gov/neo/rest/v1/feed?api_key=J8Phx815N1HFzWuNjFygvgY61lhAj3jPRqrRNabh";
  
  $.ajax(url, {
    type: "GET",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: successCallBack
  }    
  );
  }
  getImgMars(successCallBack){
    let url ="https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=J8Phx815N1HFzWuNjFygvgY61lhAj3jPRqrRNabh&page=1&per_page=5";

    $.ajax(url,{
      type: "GET",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: successCallBack
    })
  }
}

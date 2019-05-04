import keys from "./keys";

// class to handel all communication with tmdb api
class TMDB_API {
  constructor(tmdb_key) {
    this.tmdb_key = tmdb_key;
    this.baseUrl = "https://api.themoviedb.org/3/";
  }
  // take url,params return formated response
  fetchAPI(endPoint,params={}) {
    // add api key
    let defaultParams = {api_key:this.tmdb_key}
    let urlStr = this.baseUrl+endPoint
    let url = new URL(urlStr);
    url.search = new URLSearchParams({...defaultParams,...params});
    return fetch(url).then(response => response.json());;
  }
  discover(params) {
    // discover popular movies 
    // return promise 
    let url = "discover/movie";
    return this.fetchAPI(url,params)
  }
}
// initiate here to use one instance every where
const tmdb = new TMDB_API(keys.tmdb_key);

// export to use components
export default {
  tmdb
};

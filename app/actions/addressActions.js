import * as types from './actionTypes';

function requestPosts(url) {
  return {
    type: types.REQUEST_ADDRESS,
    url
  };
}

function receivePosts(results) {
  console.log("Receive posts :" + results);
  return {
    type: types.RECEIVE_ADDRESS,
    addresses: results,
    receivedAt: Date.now()
  };
}
function updateSearchText(searchString){
  return{
    type: types.CHANGE_SEARCH_TEXT,
    searchString: searchString
  }
}

export function changeSearchText(searchString){
    return dispatch=>{
      dispatch(updateSearchText(searchString))
    };
}


export function fetchAddresses(searchString){

    console.log("fetchAddresses para : " + searchString);

    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(searchString);
    return dispatch=>{
      dispatch(requestPosts(url))

      return fetch(url)
      .then(response=>response.json())
      .then(json=>
        dispatch(receivePosts(json.results))
      )
      .catch((error) => {
        console.log("FETCH ERROR " + error);
      })
    };
}

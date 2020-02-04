'use strict';


const apiKey = 'dBMsf9a0QE6jdm1t1MxXu7c5clUAf7PFiapszwoU'; 

const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
   $('#results-list').append(`
      <li><h3>${responseJson.data[i].fullName}</h3>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      </li>
      `)};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNationalParks(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults-1,

  };
  const queryString = formatQueryParams(params)
  const url = (`${searchURL}?${queryString}`);

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNationalParks(searchTerm, maxResults, apiKey);
  });
}

$(watchForm);

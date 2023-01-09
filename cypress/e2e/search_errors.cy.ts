import { verify } from "crypto";

describe('Artist Search Error Handing', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/search')
  })

  it('Should let the user know if there is an internal code error regarding fetch request when searching for artists', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      statusCode: 400
    })
    cy.get('.search-input').type('Smash Mouth')
    cy.get('.search-button').click()
    cy.get('.search-error-message')
      .contains('Uh oh, looks like something went wrong in the back, please try again later.')
  });

  it('Should also let the user know if there is an issue with the backend API in general', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      statusCode: 500
    })
    cy.get('.search-input').type('Smash Mouth')
    cy.get('.search-button').click()
    cy.get('.search-error-message')
      .contains('Uh oh, looks like something went wrong in the back, please try again later.')
  })

  it('Should let the user know if there are not any artists that meet their search term', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      method: 'GET',
      fixture: '../fixtures/noArtistMatches.json'
    });
    cy.get('.search-input').type('Smash Mouth')
    cy.get('.search-button').click()
    cy.get('.search-error-message')
      .contains(`Looks like we don't have any artists matching that name...`)
  })

  it('Should let the user know if a band they type cannot be processed by the API', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Bad%20Name&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      method: 'GET',
      fixture: '../fixtures/emptyArtistObject.json'
    });
    cy.get('.search-input').type('Bad Name')
    cy.get('.search-button').click()
    cy.get('.search-error-message')
      .contains(`Unable to read the name you typed, please enter a validly formatted name.`)
  })
})


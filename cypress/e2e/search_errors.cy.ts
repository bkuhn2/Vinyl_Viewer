import { verify } from "crypto";

describe('Search Page Error Handing', () => {

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

  

})
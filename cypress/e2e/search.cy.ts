/// <reference types="cypress" />
// @ts-check

describe('Search Page Functionality', () => {

  beforeEach(() => {
    
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      method: 'GET',
      fixture: '../fixtures/searchResults.json'
    });

    //additional intercept for next fetches

    cy.visit('http://localhost:3000/search');
  })

  it('Should have a heading', () => {
    cy.contains('Explore')
  });

  it('Should have a form for the user to type the name of their very favorite artist to search', () => {
    cy.get('.search-input')
      .type('Smash Mouth')
      .should('have.value', "Smash Mouth")
  });

  it('Should have a search button that searches for the great artist user typed', () => {
    cy.get('.search-button')
      .click()
  });

  it('Should display search results', () => {
    cy.get('.search-input')
      .type('Smash Mouth')
 
    cy.get('.search-button')
      .click()

    cy.contains('Results for "Smash Mouth"')
    cy.contains('Smash Mouth')
    cy.contains('Smash Mouth (Holiday)')
  });

  it('The search results should be links', () => {
    cy.get('.search-input')
    .type('Smash Mouth')

    cy.get('.search-button')
      .click()

    cy.get('.artist-results-section')
      .get('#0')
      .should('have.attr', 'href', '/search/Smash Mouth/Smash Mouth')
  });

})
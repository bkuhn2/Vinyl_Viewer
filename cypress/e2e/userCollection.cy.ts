/// <reference types="cypress" />

describe("My Collection test", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fcf48a134034bb684aa87d0e0309a0fd&artist=the+beatles&album=rubber+soul&format=json",
      },
      {
        fixture: "albumDetailsRubberSoul.json",
      }
    )
    cy.visit("http://localhost:3000/album/the+beatles/rubber+soul")
    cy.get(".add-button").click()
    cy.get(":nth-child(2) > a > .nav-button").click()
  })
  it("Should display the header", () => {
    cy.contains("h1", "My Collection")
  })
  it("Should display a form", () => {
    cy.get(".form")
  })
  it("Should have an input field", () => {
    cy.get(".form").within(() => {
      cy.get(".search-input")
    }) 
  })
  it("Should have one album saved", () => {
    cy.get(".album-image").should("have.length", "1")
  })
  it("Should have the album image and name", () => {
    cy.get(".album-tile").contains("Rubber Soul")
    cy.get(".album-image").should("be.visible")
  })
  it("Should display the image alt tag", () => {
    cy.get(".album-image").should("have.attr", "alt", "Album cover image of Rubber Soul")
  })
  it("Should be able to delete an album", () => {
    cy.get(".delete-album").click()
    cy.get(".album-image").should("have.length", "0")
  })
})
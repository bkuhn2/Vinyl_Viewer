/// <reference types="cypress" />

describe("Album Details Page", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fcf48a134034bb684aa87d0e0309a0fd&artist=the+beatles&album=rubber+soul&format=json",
      },
      {
        fixture: "albumDetailRubberSoul.json",
      }
    )
    cy.visit("http://localhost:3000/album/the+beatles/rubber+soul")
  })

  it("should display the correct album name and artist name data", () => {
    cy.get('[data-cy="directory-artist"]').should("have.text", "The Beatles")
    cy.get('[data-cy="directory-album"]').should("have.text", " / Rubber Soul")
    cy.get('[data-cy="album-name"]').should("have.text", "Rubber Soul")

  })
})

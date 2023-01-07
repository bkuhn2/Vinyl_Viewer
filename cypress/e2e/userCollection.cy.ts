/// <reference types="cypress" />

describe("My Collection test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/my-collection")

  })
  it("Should display the header", () => {
    cy.contains("h1", "My Collection")
  })
  it("Should display a form", () => {
    cy.get(".form")
  })
  it("Should have an input field and two buttons in the form", () => {
    cy.get(".form").within(() => {
      cy.get(".search-input")
      cy.get(".filter-button").contains("Search")
      cy.get(".clear-filter-button").contains("Clear Search Filter")
    }) 
  })
  it("Should display what the user has typed in the input field", () => {
    cy.get(".search-input").type("metallica").should("have.value", "metallica")
  })
  it("Should be able to save an album and display and filter the search", () => {
    cy.visit("http://localhost:3000/album/metallica/master+of+puppets")
      cy.get(".add-button").click()
      cy.get(":nth-child(2) > a > .nav-button").click()
      cy.get(".carousel-container").should("have.length", "1")
      cy.get(".album-image").should("be.visible")

  })
})
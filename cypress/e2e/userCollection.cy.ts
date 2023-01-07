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

})
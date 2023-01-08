/// <reference types="cypress" />

describe("Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/search")
  })

  it("should navigate to the \"My Collection\" page", () => {
    cy.get('[data-cy="nav-my-collection"]').click()
    cy.url().should("eq", "http://localhost:3000/my-collection")
  })
  
  it("should navigate to the homepage", () => {
    cy.get('[data-cy="nav-home"]').click()
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("should navigate back to the Search Form page", () => {
    cy.get('[data-cy="nav-my-collection"]').click()
    cy.get('[data-cy="nav-search"]').click()
    cy.url().should("eq", "http://localhost:3000/search")
  })
})
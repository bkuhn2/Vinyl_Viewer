describe("My Collection test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/my-collection")
  })
  it("Should display the header", () => {
    cy.contains("h1", "My Collection")
  })
})
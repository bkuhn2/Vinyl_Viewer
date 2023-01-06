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
      cy.get(".filter-button")
    }) 
  })
  it("Should display an image with an alt tag", () => {
    cy.get(".single-card").eq(0).within(() => {
      cy.get(".album-image").should("be.visible")
      cy.get(".album-image").should(([img]) => {
        expect(img.alt).contains("Album cover image of Mojo")
      })
    })
  })
})
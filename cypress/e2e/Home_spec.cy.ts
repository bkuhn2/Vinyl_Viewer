describe('Home Page', () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it('should have a title', () => {
    cy.contains('Vinyl Viewer')
  })

  it('should display a search artist title and image', () => {
    cy.get('.split-screen')
      .find('.artist-search')
        .should('have.css', 'background-image', 'url("http://localhost:3000/static/media/RecordsTop.9366c5709e1536e8f268.JPG")')
      .contains('Search Artists')

  })

  
})
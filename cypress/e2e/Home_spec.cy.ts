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

  it('should display my collection title and image', () => {
    cy.get('.split-screen')
      .find('.user-collection')
        .should('have.css', 'background-image', 'url("http://localhost:3000/static/media/RecordsSide.aee915d23f40eedaf87b.JPG")')
      .contains('My Collection')
  })
  
  it('should navigate to the search page when search artists is clicked', () => {
    cy.get('.split-screen')
      .find('.artist-search')
        .click()
          .url().should('include', '/search')
  })

  it('should navigate to my collection when it is clicked', () => {
    cy.get('.split-screen')
      .find('.user-collection')
        .click()
          .url().should('include', '/my-collection')
  })
  
})
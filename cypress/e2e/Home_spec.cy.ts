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
        .should('have.css', 'background-image', 'linear-gradient(10deg, rgba(44, 43, 43, 0.54) 19%, rgba(37, 24, 24, 0.706) 83%), url("http://localhost:3000/static/media/recordstore1.8d66f285d6fb42dda506.jpg")')
      .contains('Search Artists')
  })

  it('should display my collection title and image', () => {
    cy.get('.split-screen')
      .find('.user-collection')
        .should('have.css', 'background-image', 'linear-gradient(10deg, rgba(70, 67, 67, 0.54) 19%, rgba(40, 25, 26, 0.68) 83%), url("http://localhost:3000/static/media/collection.8a9c2cd79edc2e91ae91.jpg")')
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
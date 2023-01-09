

describe('Artist Search Error Handing', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/search')
  })

  it('Should let the user know if there is an internal code error regarding fetch request when searching for artists', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      statusCode: 400
    })
    cy.get('.search-input').type('Smash Mouth')
    cy.get('.search-button').click()
    cy.get('.search-error-message')
      .contains('Uh oh, looks like something went wrong in the back, please try again later.')
  });

  it('Should also let the user know if there is an issue with the backend API in general', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      statusCode: 500
    })
    cy.get('.search-input').type('Smash Mouth')
    cy.get('.search-button').click()
    cy.get('.search-error-message')
      .contains('Uh oh, looks like something went wrong in the back, please try again later.')
  })

  it('Should let the user know if there are not any artists that meet their search term', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      method: 'GET',
      fixture: '../fixtures/noArtistMatches.json'
    });
    cy.get('.search-input').type('Smash Mouth')
    cy.get('.search-button').click()
    cy.get('.search-error-message')
      .contains(`Looks like we don't have any artists matching that name...`)
  })

  it('Should let the user know if a band they type cannot be processed by the API', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Bad%20Name&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      method: 'GET',
      fixture: '../fixtures/emptyArtistObject.json'
    });
    cy.get('.search-input').type('Bad Name')
    cy.get('.search-button').click()
    cy.get('.search-error-message')
      .contains(`Unable to read the name you typed, please enter a validly formatted name.`)
  })

  it('User should not be able to type certain characters', () => {
    cy.get('.search-input').type(`&/#%?<>{}`)
    cy.get('.search-input').should('have.value', '')
  })
})

describe(`Artist's Album Search Error Handling`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/search')
  })

  it(`Should let the user know if there is an internal code error regarding fetch request when getting that artist's top albums`, () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd&format=json`, {
      statusCode: 400
    })
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      method: 'GET',
      fixture: '../fixtures/searchResults.json'
    })
    cy.get('.search-input').type('Smash Mouth')
    cy.get('.search-button').click()
    cy.get('.artist-results-section')
      .get('#0').click()
    cy.contains('Uh oh, looks like something went wrong in the back, please try again later.')
  });

  it('Should also let the user know if there is an issue with the backend API in general when trying to click on an artist name', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd&format=json`, {
      statusCode: 500
    })
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Smash%20Mouth&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      method: 'GET',
      fixture: '../fixtures/searchResults.json'
    })
    cy.get('.search-input').type('Smash Mouth')
    cy.get('.search-button').click()
    cy.get('.artist-results-section')
      .get('#0').click()
    cy.contains('Uh oh, looks like something went wrong in the back, please try again later.')
  })

  it('Should let the user know if the API sends back an ok reponse, but has an error message', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Bad%20Artist&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      method: 'GET',
      fixture: '../fixtures/badArtist.json'
    })
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Bad%20Artist&api_key=fcf48a134034bb684aa87d0e0309a0fd&format=json`, {
      method: 'GET',
      fixture: '../fixtures/badAlbum1.json'
    })

    cy.get('.search-input').type('Bad Artist')
    cy.get('.search-button').click()
    cy.get('.artist-results-section')
      .get('#0').click()
    cy.contains(`Couldn't find any albums for this artist`)
  })

  it('Should let the user know the data for the artist they clicked on does not have any albums in it', () => {
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=Bad%20Artist&api_key=fcf48a134034bb684aa87d0e0309a0fd%20%20%20%20&format=json`, {
      method: 'GET',
      fixture: '../fixtures/badArtist.json'
    })
    cy.intercept(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Bad%20Artist%20Collab&api_key=fcf48a134034bb684aa87d0e0309a0fd&format=json`, {
      method: 'GET',
      fixture: '../fixtures/badAlbum2.json'
    })

    cy.get('.search-input').type('Bad Artist')
    cy.get('.search-button').click()
    cy.get('.artist-results-section')
      .get('#1').click()
    cy.contains(`Couldn't find any albums for this artist`)
  })
})

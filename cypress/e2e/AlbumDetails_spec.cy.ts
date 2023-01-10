/// <reference types="cypress" />

describe("Album Details Page", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fcf48a134034bb684aa87d0e0309a0fd&artist=the+beatles&album=rubber+soul&format=json",
      },
      {
        fixture: "albumDetailsRubberSoul.json",
      }
    )
    cy.visit("http://localhost:3000/album/the+beatles/rubber+soul")
  })

  it("should display the correct album name and artist name data", () => {
    cy.get('[data-cy="directory-artist"]').should("have.text", "The Beatles")
    cy.get('[data-cy="directory-album"]').should("have.text", " / Rubber Soul")
    cy.get('[data-cy="album-name"]').should("have.text", "Rubber Soul")
  })

  it("should display the correctly formatted release date", () => {
    cy.get('[data-cy="album-date"]').should("have.text", "released on: Jan 1, 2009")
  })

  it("should link to the correct Last.fm URL", () => {
    cy.get('[data-cy="album-link"]').invoke("attr", "href").should("eq", "https://www.last.fm/music/The+Beatles/Rubber+Soul")
  })

  it("should display the correctly-formatted album article", () => {
    cy.get('[data-cy="album-article"]').should("have.text", "Rubber Soul is the sixth studio album by the English rock band The Beatles. Released in December 1965, and produced by George Martin, Rubber Soul was recorded in just over four weeks to make the Christmas market. Showcasing a sound influenced by the folk rock of The Byrds and Bob Dylan, the album was seen as a major artistic achievement for the band, attaining widespread critical and commercial success, with reviewers taking note of The Beatles' developing musical vision. In 2003, the album was ranked number 5 on Rolling Stone magazine's list of the 500 greatest albums of all time. ... (cont.)")
  })

  it("should display the correct tracklist", () => {
    cy.get('[data-cy="album-tracklist"]').find("li").first()
      .should("have.text", "Drive My Car")
      .next()
      .should("have.text", "Norwegian Wood (This Bird Has Flown)")
      .next()
      .should("have.text", "You Won't See Me")
      .next()
      .should("have.text", "Nowhere Man")
      .next()
      .should("have.text", "Think for Yourself")
      .next()
      .should("have.text", "The Word")
      .next()
      .should("have.text", "Michelle")
      .next()
      .should("have.text", "What Goes On")
      .next()
      .should("have.text", "Girl")
      .next()
      .should("have.text", "I'm Looking Through You")
      .next()
      .should("have.text", "In My Life")
      .next()
      .should("have.text", "Wait")
      .next()
      .should("have.text", "If I Needed Someone")
      .next()
      .should("have.text", "Run for Your Life")
  })

  it("should display the correct album cover and have the correct alt attribute", () => {
    cy.get('[data-cy="album-cover"]').invoke("attr", "src").should("eq", "https://lastfm.freetls.fastly.net/i/u/300x300/72ed10a859fb4c1fb29a546078ec737d.png")
    cy.get('[data-cy="album-cover"]').invoke("attr", "alt").should("eq", "album artwork for Rubber Soul by The Beatles")
  })

  it("should allow a user to add the displayed album to their collection", () => {
    cy.get('[data-cy="add-button"]').click()
    cy.get('[data-cy="saved-message"]').should("be.visible")
  })

  it("should only show the \"add to collection\" button if the album has not been previously saved", () => {
    cy.get('[data-cy="add-button"]').click()
    cy.get('[data-cy="add-button"]').should("not.exist")
  })

  it("should only show the \"album is saved in collection\" message if the album has been previously saved", () => {
    cy.get('[data-cy="saved-message"]').should("not.exist")
    cy.get('[data-cy="add-button"]').click()
    cy.get('[data-cy="saved-message"]').should("be.visible")
  })
})

describe("Album Details Page (missing data)", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fcf48a134034bb684aa87d0e0309a0fd&artist=george+harrison&album=all+things+must+pass&format=json",
      },
      {
        fixture: "albumDetailsMissingData.json",
      }
    )
    cy.visit("http://localhost:3000/album/george+harrison/all+things+must+pass")
  })

  it("should not try to display a tracklist if there is no track data available", () => {
    cy.get('[data-cy="saved-message"]').should("not.exist")
  })
 
  it("should not try to display a release date if there is no release date data available", () => {
    cy.get('[data-cy="album-date"]').should("not.exist")
  })

  it("should not try to display an album's article if there is no article data available", () => {
    cy.get('[data-cy="album-article"]').should("not.exist")
  })

  it("should display a fallback image if there is no album image available", () => {
    cy.get('[data-cy="album-cover"]').invoke("attr", "src").should("eq", "/static/media/fallback.36cccec721043b9b96a4.png")
  })
})

describe("Album Details Page (error handling)", () => {
  it("should show an error message if a bad request is made", () => {
    cy.visit("http://localhost:3000/album/led+zeppelin/led+zelin+ii")
    cy.get('[data-cy="album-section"]').should("not.exist")
    cy.get('[data-cy="album-detail-error"]').should("be.visible")
  })
})
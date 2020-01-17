describe('Test the side list', function() {
  it('Visits my App', function() {
    cy.visit('http://localhost:3000/')

    cy.contains('Song')
  })

  // it('Looks for my title', function() {
  //   cy.title().should('include', 'chordly')
  // })

  it('has a button to open the sidelist', () => {
    cy.get('#list-button').click()
  })

  it('open the search field', () => {
    cy.get('.search-icon').click()
  })

  it('can type something into the search field', () => {
    cy.get('.InputField-sc-1o7oa2o-0').type('come')
    cy.contains('Come Away')
  })
})

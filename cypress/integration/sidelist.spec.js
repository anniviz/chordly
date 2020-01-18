describe('Test the side list', function() {
  it('Visits my App', function() {
    cy.visit('http://localhost:3000/')

    cy.contains('Loading ...').should('not.exist')
  })

  it('has a button to open the sidelist', () => {
    cy.get('#list-button').click()
  })

  it('open the search field', () => {
    cy.get('.search-icon')
      .should('be.visible')
      .click()
  })

  it('can type something into the search field', () => {
    cy.get('.InputField-sc-1o7oa2o-0').type('come')
    cy.contains('Come Away')
  })
})

describe('My First Test', function() {
  it('Visits my App', function() {
    cy.visit('http://localhost:3000/')

    cy.contains('Song')
  })

  it('Looks for my title', function() {
    cy.title().should('include', 'chordly')
  })

  it('has a button to open the sidelist', () => {
    cy.get('#list-button').click()
    // cy.contains('Come Away').click()
  })
})

describe('Test add song function', function() {
  it('Navigates to the AddSong-Route', function() {
    cy.visit('http://localhost:3000/')
    cy.contains('Loading ...').should('not.exist')
    cy.get('#list-button').click()

    cy.get('.add-icon')
      .should('be.visible')
      .click()
  })

  it('text area is focused', () => {
    cy.get('textarea').should('have.focus')
  })
})

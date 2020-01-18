describe('Test add song function', function() {
  it('Navigates to the AddSong-Route', function() {
    cy.visit('http://localhost:3000/')
    cy.contains('Loading ...').should('not.exist')
    cy.get('#list-button').click()
  })

  it('open the search field', () => {
    cy.get('.add-icon')
      .should('be.visible')
      .click()
  })
})

describe("My First Test", function() {
  it("Visits my App", function() {
    cy.visit("http://localhost:3000/");

    cy.contains("Song");
  });

  it("Looks for my title", function() {
    cy.title().should("include", "chordly");
  });
});

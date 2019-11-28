describe('Hero creation', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', 'http://localhost:4200/api/heroes').as('heroes');
    cy.visit('http://localhost:4200/heroes');
    cy.wait('@heroes');
  });

  it('should create a hero', () => {
    cy.get('app-heroes').within(() => {
      cy.get('input')
        .type('Test');

      cy.get('button')
        .contains('add')
        .click();

      cy.get('.heroes')
        .find('a')
        .eq(-1)
        .should('contain', 'Test');
    });

    cy.reload();

    cy.get('.heroes')
      .find('a')
      .eq(-1)
      .should('contain', 'Test');
  })
});

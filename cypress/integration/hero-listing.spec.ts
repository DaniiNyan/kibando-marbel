describe('Hero listing', () => {
  let heroesList;

  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:4200/api/heroes',
      onResponse: request => {
        heroesList = request.response.body;
      }
    }).as('heroes');

    cy.visit('http://localhost:4200/heroes');

  });

  it('should list all heroes', () => {
    cy.wait('@heroes');
    cy.get('.heroes').within(() => {
      cy.get('li').should('have.length', heroesList.length)
    })
  });
});

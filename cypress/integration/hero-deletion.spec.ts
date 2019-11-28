describe('Hero editing', () => {
  let heroesListSize;

  const hero = {
    id: 88888888888888888,
    name: 'Deleting Hero'
  };

  beforeEach(() => {
    cy.server()
    cy.request('POST', 'http://localhost:4200/api/heroes', hero)
      .as('addHero');

    cy.route({
      method: 'GET',
      url: 'http://localhost:4200/api/heroes',
      onResponse: request => {
        heroesListSize = request.response.body.length;
      }
    }).as('heroes');

    cy.route({
      method: 'POST',
      url: 'http://localhost:4200/api/heroes'
    }).as('addHeroes');

    cy.visit('http://localhost:4200/heroes');

  });

  it('should delete a hero', () => {
    cy.get('.heroes')
      .find('button')
      .eq(-1)
      .contains('x')
      .click();

    cy.get('.heroes')
      .find('a')
      .eq(-1)
      .should('not.contain', 'Deleting Hero');

    cy.reload();

    cy.get('.heroes')
      .find('a')
      .eq(-1)
      .should('not.contain', 'Deleting Hero');

    cy.get('.heroes').within(() => {
      cy.get('li')
        .should('have.length', heroesListSize);
    });
  });
});

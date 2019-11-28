describe('Hero editing', () => {
  beforeEach(() => {
    const hero = {
      id: 9999999999999999999,
      name: 'Editing Hero'
    };

    cy.server()
    cy.request('POST', 'http://localhost:4200/api/heroes', hero)
      .as('addHero');

    cy.route({
      method: 'GET',
      url: 'http://localhost:4200/api/heroes'
    }).as('heroes');

    cy.route({
      method: 'POST',
      url: 'http://localhost:4200/api/heroes'
    }).as('addHeroes');

    cy.visit('http://localhost:4200/heroes');

  });

  it('should edit a hero', () => {
    cy.get('.heroes')
      .find('a')
      .eq(-1)
      .click();

    cy.get('app-hero-detail').within(() => {
      cy.get('input')
        .clear()
        .type('Edited Hero');

      cy.get('button')
        .contains('save')
        .click();
    });

    cy.get('.heroes')
      .find('a')
      .eq(-1)
      .should('contain', 'Edited Hero');
  });
});

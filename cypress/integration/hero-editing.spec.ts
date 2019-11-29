describe('Hero editing', () => {
  const hero = {
    name: 'Editing Hero'
  };

  beforeEach(() => {
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

    // wait

    cy.get('.heroes')
      .find('a')
      .eq(-1)
      .should('contain', 'Edited Hero');
  });

  afterEach(() => {
    cy.get('.heroes')
      .find('a')
      .eq(-1)
      .find('.badge').then($id => {
        console.log($id);
        const id = $id[0].innerHTML;
        cy.request('DELETE', `http://localhost:4200/api/heroes/${id}`);
      });
  });
});

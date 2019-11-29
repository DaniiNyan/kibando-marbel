describe('Hero listing', () => {
  let heroesList;

  const hero = {
    name: 'Listing Hero'
  };

  describe('when given data', () => {
    beforeEach(() => {
      cy.server()

      cy.route({
        method: 'GET',
        url: 'http://localhost:4200/api/heroes',
        onResponse: request => {
          heroesList = request.response.body;
        }
      }).as('heroes');

      cy.request('POST', 'http://localhost:4200/api/heroes', hero);

      cy.visit('http://localhost:4200/heroes');
      cy.wait('@heroes');
    });

    it('should list all heroes', () => {
      cy.get('.heroes')
        .find('li')
        .should('have.length', heroesList.length);
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

  describe('when not given data', () => {
    beforeEach(() => {
      cy.server();
      cy.route('GET', 'http://localhost:4200/api/heroes/', []);
    });

    it('li should not exist', () => {
      cy.get('.heroes')
        .find('li')
        .should('not.exist');
    });
  })
});


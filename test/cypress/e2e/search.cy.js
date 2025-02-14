describe('Teste de busca', () => {
    it('Deve buscar "Mesa" e exibir os resultados', () => {
        cy.visit('/') // Acessa a home
  
        cy.get('input[name="search"]').type('Mesa') // Digita "Mesa" no campo de busca
        cy.get('button[name="searchBtn"]').click() // Clica no botão de busca
    
        cy.intercept('GET', 'http://localhost:5000/search?q=Mesa', { // Intercepta a requisição de busca
            statusCode: 200,
            body: {
                results: [ // Resultados da busca
                    { id: 1, name: 'Mesa de Madeira', category: 'Produtos', quantity: 2 },
                    { id: 2, name: 'Mesa de Vidro', category: 'Produtos', quantity: 1 }
                ]
            }
        }).as('searchRequest'); // Intercepta a requisição de busca
    
        cy.wait('@searchRequest'); // Aguarda a resposta do backend
    
        cy.get('.results h3').should('contain', 'Foram encontrados 2 resultados'); // Verifica o texto dos resultados
        cy.get('.category').should('have.length', 5); // Verifica se há pelo menos 1 categoria
        cy.get('.item-name').first().should('contain', 'Mesa de Madeira'); // Verifica se a Mesa de Madeira apareceu

        cy.screenshot('success-screenshot'); // Captura a tela se passou
    });
});
const users = require('../../fixtures/web/data/users.json');

describe('Autenticação de Usuários', () => {
    it('Deve realizar a autenticação com sucesso', () => {
        const { email, password } = users.users;

        cy.request({
            method: 'POST',
            url: '/public/authUser',
            body: { email, password }
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true);
            expect(res.body.data).to.have.property('token');
        });
    });
});

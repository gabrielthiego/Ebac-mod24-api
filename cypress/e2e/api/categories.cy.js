const users = require('../../fixtures/web/data/users.json');
import { postUserAndToken } from '../../fixtures/functions/auth.js';
import { getIdCategory, postNewCategory } from '../../fixtures/functions/category.js';
const faker = require('faker-br');

const image = "https://enotas.com.br/blog/wp-content/uploads/2017/05/banco-de-imagens-gratuitos-public-domain-pictures.jpg";
const randomCategoryName = faker.commerce.department();

describe('Categorias', () => {
    beforeEach(() => {
        postUserAndToken(users.users.email, users.users.password);
        getIdCategory();
    });

    it('Incluir ', () => {
        cy.request({
            method: 'POST',
            url: '/api/addCategory',
            headers: { 'Authorization': Cypress.env('token') },
            body: { name: randomCategoryName, photo: image }
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true);
            expect(res.body).to.have.property('message').to.eq('category added');
            expect(res.body.data).to.have.property('name').to.eq(randomCategoryName);
        });
    });

    it('Listar', () => {
        postNewCategory(randomCategoryName, image);
        cy.request({ method: 'GET', url: '/public/getCategories' }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true);
            expect(res.body.categories[0]._id).to.exist;
        });
    });

    it('Alterar', () => {
        postNewCategory(randomCategoryName, image);
        cy.request({
            method: 'PUT',
            url: `/api/editCategory/${Cypress.env('categoryId')}`,
            headers: { 'Authorization': Cypress.env('token') },
            body: { name: randomCategoryName, photo: image }
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true);
            expect(res.body).to.have.property('message').to.eq('category updated');
        });
    });

    it('Excluir', () => {
        postNewCategory(randomCategoryName, image);
        cy.request({
            method: 'DELETE',
            url: `/api/deleteCategory/${Cypress.env('categoryId')}`,
            headers: { 'Authorization': Cypress.env('token') }
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true);
            expect(res.body).to.have.property('message').to.eq('category deleted');
        });
    });
});

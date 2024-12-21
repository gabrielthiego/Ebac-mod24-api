import { postUserAndToken } from '../../fixtures/functions/auth.js';
import { getIdProduct, postNewproduct } from '../../fixtures/functions/products.js';
import faker from 'faker-br';

const users = require('../../fixtures/web/data/users.json');

let name = faker.commerce.productName();
let price = faker.commerce.price();
let quantity = faker.random.number({ min: 1, max: 100 });
let categories = Cypress.env('categoryId');
let description = faker.commerce.productAdjective();
let photos = "https://enotas.com.br/blog/wp-content/uploads/2017/05/banco-de-imagens-gratuitos-public-domain-pictures.jpg";
let popular = true;
let visible = true;
let location = "Rio de Janeiro , RJ, Brasil";
let additionalDetails = [];
let specialPrice = faker.commerce.price();


beforeEach(() => {
    postUserAndToken(users.users.email, users.users.password, { log: false });
    getIdProduct();
 
});

describe('Produtos', () => {

    it('Incluir', () => {
        postNewproduct(name, price, quantity, categories, description, photos, popular, visible, location, additionalDetails, specialPrice)
        cy.request({
            method: 'POST',
            url: '/api/addProduct',
            headers: { 'Authorization': Cypress.env('token') },
            body: { name, price, quantity, categories, description, photos, popular, visible, location, additionalDetails, specialPrice }
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true);
            expect(res.body).to.have.property('message').to.eq('product added');
        });
    });

    it('Listar', () => {
        postNewproduct(name, price, quantity, categories, description, photos, popular, visible, location, additionalDetails, specialPrice);
        cy.request({ method: 'GET', url: '/public/getProducts' }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true);
            expect(res.body.products[0]._id).to.exist;
        });
    });

    it('Listar detalhes', () => {
        postNewproduct(name, price, quantity, categories, description, photos, popular, visible, location, additionalDetails, specialPrice);
        cy.request({ method: 'GET', url: `/public/getProductDetails/${Cypress.env('productId')}` }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true);
            expect(res.body.product._id).to.exist;
        });
    });

    it('Alterar', () => {
        postNewproduct(name, price, quantity, categories, description, photos, popular, visible, location, additionalDetails, specialPrice);
        cy.request({
            method: 'PUT',
            url: `/api/editProduct/${Cypress.env('productId')}`,
            headers: { 'Authorization': Cypress.env('token') },
            body: { name, price, quantity, categories, description, photos, popular, visible, location, additionalDetails, specialPrice }
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true);
            expect(res.body).to.have.property('message').to.eq('product updated');
        });
    });

    it('Excluir', () => {
        postNewproduct(name, price, quantity, categories, description, photos, popular, visible, location, additionalDetails, specialPrice);
        cy.request({
            method: 'DELETE',
            url: `/api/deleteProduct/${Cypress.env('productId')}`,
            headers: { 'Authorization': Cypress.env('token') }
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true);
            expect(res.body).to.have.property('message').to.eq('product deleted');
        });
    });
});

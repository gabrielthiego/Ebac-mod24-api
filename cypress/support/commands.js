

Cypress.Commands.add('validateParametersResponse', (resStatus, resMessage, resCode, resTrueAndFalse) => {
  expect(resStatus).to.eq(resCode);
  expect(resMessage).to.have.property('success').to.eq(resTrueAndFalse);
})
Cypress.Commands.add('login', (username, password) => {
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#loginButton').click();
  });
  // contratos

export const validateProductContract = (method, endpoint, requestBody) => {
  cy.request({
    method: method,
    url: endpoint,
    headers: {
      'Authorization': Cypress.env('token')
    },
    body: requestBody
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('data');
  });
};
Cypress.Commands.add('postUserAndToken', (email, password) => {
  const usuario = { 
      "email": email, 
      "password": password 
  };

  return cy.request({ 
      method: 'POST',
      url: '/public/authUser',
      body: usuario
  }).then((res) => {
      let token = res.body.data.token;
      Cypress.env('token', token, { log: false });
      return token;
  });
});

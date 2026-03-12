const BASE_URL = 'https://thinking-tester-contact-list.herokuapp.com';

function randomString(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
}

describe('Contact List - User CRUD', () => {
  const user = {
    firstName: randomString(),
    lastName: randomString(),
    email: `test_${Date.now()}@fake.com`,
    password: 'Test1234',
  };
  let token;

  it('POST /users - Add a new user', () => {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/users`,
      body: user,
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.user.firstName).to.eq(user.firstName);
      expect(res.body.user.lastName).to.eq(user.lastName);
      expect(res.body.user.email).to.eq(user.email);
      expect(res.body).to.have.property('token');
      token = res.body.token;
    });
  });

  it('GET /users/me - Verify the created user', () => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}/users/me`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.firstName).to.eq(user.firstName);
      expect(res.body.lastName).to.eq(user.lastName);
      expect(res.body.email).to.eq(user.email);
    });
  });

  it('PATCH /users/me - Update firstName and lastName with random values', () => {
    user.firstName = randomString();
    user.lastName = randomString();

    cy.request({
      method: 'PATCH',
      url: `${BASE_URL}/users/me`,
      headers: { Authorization: `Bearer ${token}` },
      body: { firstName: user.firstName, lastName: user.lastName },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.firstName).to.eq(user.firstName);
      expect(res.body.lastName).to.eq(user.lastName);
    });
  });

  it('GET /users/me - Verify the updated values', () => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}/users/me`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.firstName).to.eq(user.firstName);
      expect(res.body.lastName).to.eq(user.lastName);
    });
  });

  it('DELETE /users/me - Delete the user', () => {
    cy.request({
      method: 'DELETE',
      url: `${BASE_URL}/users/me`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('GET /users/me - Verify user is deleted (401)', () => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}/users/me`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });
});

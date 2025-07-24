describe('Reqres API Automation Test', () => {
  const baseUrl = 'https://reqres.in/api';

  it('GET - List Users', () => {
    cy.request(`${baseUrl}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
    });
  });

  it('GET - Single User', () => {
    cy.request(`${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('id', 2);
    });
  });


it('POST - Create User', () => {
  const user = {
    name: "Rayhan",
    job: "QA Tester",
    id: "2",
    createdAt: new Date().toISOString()
  };

  cy.request({
    method: 'POST',
    url: `${baseUrl}/users`,
    body: user,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false // supaya bisa cek response walau bukan 2xx
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
    //   expect(response.status).to.eq(201);
    //   expect(response.body).to.include.keys('name', 'job', 'id', 'createdAt');
  });
});

it('PUT - Edit User', () => {
        cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/5',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body: {
                name: 'Charles',
                job: 'Resident'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Charles');
        });
    });

   it('Test API Update PUT User', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/5',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body: {
                name: 'Charles',
                job: 'Resident'
            }
        }).then((response) => {
            expect(response.status).to.eq(204);
        });
    });
});

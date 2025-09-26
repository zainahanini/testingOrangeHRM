import { UserHelper } from "../../helpers/user-helper";
import { CreateUserRequest } from "../../interfaces/users";

describe('Get all list of users', () => {

  it('Should fetch all users on page 2 and validate response', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.per_page).to.eq(6);
      expect(res.body.total).to.eq(12);
      expect(res.body.total_pages).to.eq(2);

      expect(res.body.data).to.have.length(6);
      cy.log("Response body: " + JSON.stringify(res.body));
   
    });
  });

});

// describe('Create a new user', () => {
//   it('Should create a new user and validate response', () => {
//     cy.request({
//       method: 'POST',
//       url: 'https://reqres.in/api/users',
//       body: {
//       name: "morpheus",
//       job: "leader",
//       },
//       headers: {
//     "x-api-key": "reqres-free-v1", 
//      },

  
//   }).then((res) => {
//     expect(res.status).to.eq(201);
//     expect(res.body).to.have.property('name', 'morpheus');
//     expect(res.body).to.have.property('job', 'leader');
//     expect(res.body).to.have.property('id');
//     expect(res.body).to.have.property('createdAt');
//     expect(res.body.id).to.not.be.null;
//     expect(res.body.createdAt).to.not.be.null;

//   });
//   });
// });

describe('Create a new user', () => {
  it('Should create a new user and validate response', () => {
    const requestBody: CreateUserRequest = {
      name: "morpheus",
      job: "leader",
    };
    UserHelper.createUser(requestBody).then((res) => {
      expect(res.status).to.eq(201);

      expect(res.body).to.have.property('name', requestBody.name);
      expect(res.body).to.have.property('job', requestBody.job);
      expect(res.body).to.have.property('id').and.to.not.be.null;
      expect(res.body).to.have.property('createdAt').and.to.not.be.null;
      cy.log("Response body: " + JSON.stringify(res.body));
    });
  });
});
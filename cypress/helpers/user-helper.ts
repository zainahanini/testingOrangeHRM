import { CreateUserRequest } from "../interfaces/users";
import { CreateUserResponse } from "../interfaces/users";

const LOCATORS = {
    CREATE_USER_URL: 'https://reqres.in/api/users',
};

export class UserHelper {
    static createUser(payload: CreateUserRequest) {
    return cy.apiRequest( "POST", LOCATORS.CREATE_USER_URL, payload);
  }
}
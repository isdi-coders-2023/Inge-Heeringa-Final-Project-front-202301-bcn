import { createAction } from "@ngrx/store";
import { loginUser, logoutUser } from "../actions/user.actions";
import { User, UserState } from "../types";
import { reducer } from "./user.reducer";

const defaultAction = createAction("default");

describe("Given a User Reducer function", () => {
  describe("When it receives a user with a negative isLogged status and a Login User action", () => {
    test("Then it should return a user with email 'mock@user.com', a token '123' and a positive isLogged status", () => {
      const currentUserState: UserState = {
        email: "",
        token: "",
        isLogged: true,
      };
      const user: User = {
        email: "mock@user.com",
        token: "123",
      };
      const expectedUserState: UserState = {
        email: "mock@user.com",
        token: "123",
        isLogged: true,
      };
      const action = loginUser({ payload: user });

      const newUserState = reducer(currentUserState, action);

      expect(newUserState).toStrictEqual(expectedUserState);
    });
  });

  describe("When it receives a user with a negative isLogged status and an invalid action", () => {
    test("Then it should return the current user state", () => {
      const currentUserState = {
        email: "",
        token: "",
        isLogged: false,
      };
      const expectedUserState = {
        email: "",
        token: "",
        isLogged: false,
      };

      const invalidAction = defaultAction;

      const newUserState = reducer(currentUserState, invalidAction);

      expect(newUserState).toStrictEqual(expectedUserState);
    });
  });

  describe("When it receives a logged user and Logout user action", () => {
    test("Then it should return a user state with an empty email address, an empty token and a negative isLogged status", () => {
      const currentUserState = {
        email: "",
        token: "",
        isLogged: true,
      };
      const expectedUserState = {
        email: "",
        token: "",
        isLogged: false,
      };

      const action = logoutUser;

      const newUserState = reducer(currentUserState, action);

      expect(newUserState).toStrictEqual(expectedUserState);
    });
  });
});

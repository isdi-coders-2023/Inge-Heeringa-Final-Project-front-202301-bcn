import { loginUser } from "../actions/user.actions";
import { reducer } from "./user.reducer";

describe("Given a User Reducer function", () => {
  describe("When it receives a user with a negative isLogged status and a Login User action", () => {
    test("Then it should return a user with email 'mock@user.com', a token '123' and a positive isLogged status", () => {
      const currentUserState = {
        email: "",
        token: "",
        isLogged: true,
      };
      const user = {
        email: "mock@user.com",
        token: "123",
      };
      const expectedUserState = {
        email: "mock@user.com",
        token: "123",
        isLogged: true,
      };
      const action = loginUser({ payload: user });

      const newUserState = reducer(currentUserState, action);

      expect(newUserState).toStrictEqual(expectedUserState);
    });
  });
});

import { createAction } from "@ngrx/store";
import { showModal } from "./ui.actions";
import { UiState } from "./types";
import { reducer } from "./ui.reducer";

const defaultAction = createAction("default");
describe("Given a Ui Reducer funcion", () => {
  describe("When it receives a UI state with an empty message and a negative isError status and a Show Modal action", () => {
    test("Then it should return a UI state with a message 'Wrong credentials' and a positive isError status", () => {
      const currentUiState: UiState = {
        modalMessage: "",
        isError: false,
      };
      const uiFeedback = {
        modalMessage: "Wrong credentials",
        isError: true,
      };
      const expectedUiState: UiState = {
        modalMessage: "Wrong credentials",
        isError: true,
      };
      const action = showModal({ payload: uiFeedback });

      const newUiState = reducer(currentUiState, action);

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });

  describe("When it receives a UI state with an empty message and a negative isError status and an invalid action", () => {
    test("Then it should return the current UI state unchanged", () => {
      const currentUiState: UiState = {
        modalMessage: "",
        isError: false,
      };
      const expectedUiState: UiState = {
        modalMessage: "",
        isError: false,
      };
      const invalidAction = defaultAction;

      const newUiState = reducer(currentUiState, invalidAction);

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });
});

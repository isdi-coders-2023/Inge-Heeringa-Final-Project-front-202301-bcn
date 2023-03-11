import { createAction } from "@ngrx/store";
import { hideLoading, showLoading, showModal } from "./ui.actions";
import { Modal, UiState } from "./types";
import { reducer } from "./ui.reducer";

const defaultAction = createAction("default");
describe("Given a Ui Reducer funcion", () => {
  describe("When it receives a UI state with an empty message and a negative isError status and a Show Modal action", () => {
    test("Then it should return a UI state with a message 'Wrong credentials' and a positive isError status", () => {
      const currentUiState: UiState = {
        isLoading: false,
        modalMessage: "",
        isError: false,
      };
      const uiFeedback: Modal = {
        modalMessage: "Wrong credentials",
        isError: true,
      };
      const expectedUiState: UiState = {
        isLoading: false,
        modalMessage: "Wrong credentials",
        isError: true,
      };
      const action = showModal({ payload: uiFeedback });

      const newUiState = reducer(currentUiState, action);

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });

  describe("When it receives a UI state with a negative isLoading status and a Show Loading action", () => {
    test("Then it should return a UI state with a positive isLoading status", () => {
      const currentUiState: UiState = {
        isLoading: false,
        modalMessage: "",
        isError: false,
      };
      const expectedUiState: UiState = {
        isLoading: true,
        modalMessage: "",
        isError: false,
      };
      const action = showLoading;

      const newUiState = reducer(currentUiState, action);

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });

  describe("When it receives a UI state with a positive isLoading status and a Hide Loading action", () => {
    test("Then it should return a UI state with a negative isLoading status", () => {
      const currentUiState: UiState = {
        isLoading: true,
        modalMessage: "",
        isError: false,
      };
      const expectedUiState: UiState = {
        isLoading: false,
        modalMessage: "",
        isError: false,
      };
      const action = hideLoading;

      const newUiState = reducer(currentUiState, action);

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });

  describe("When it receives a UI state with an empty message and a negative isLoading and isError status and an invalid action", () => {
    test("Then it should return the current UI state unchanged", () => {
      const currentUiState: UiState = {
        isLoading: false,
        modalMessage: "",
        isError: false,
      };
      const expectedUiState: UiState = {
        isLoading: false,
        modalMessage: "",
        isError: false,
      };
      const invalidAction = defaultAction;

      const newUiState = reducer(currentUiState, invalidAction);

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });
});

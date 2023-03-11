import { createFeature, createReducer, on } from "@ngrx/store";

import { showModal } from "./ui.actions";
import { UiState } from "./types";

export const initialState: UiState = {
  modalMessage: "",
  isError: false,
};

export const uiFeature = createFeature({
  name: "ui",
  reducer: createReducer(
    initialState,
    on(showModal, (currentState, { payload }) => ({
      ...currentState,
      ...payload,
    }))
  ),
});

export const {
  name: uiFeatureKey,
  reducer,
  selectUiState,
  selectModalMessage,
  selectIsError,
} = uiFeature;

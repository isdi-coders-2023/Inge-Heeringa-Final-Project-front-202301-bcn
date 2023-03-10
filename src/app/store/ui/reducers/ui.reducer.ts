import { createFeature, createReducer, on } from "@ngrx/store";

import { showModal } from "../actions/ui.actions";
import { UiState } from "../types";

export const initialState: UiState = {
  modalMessage: "test",
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

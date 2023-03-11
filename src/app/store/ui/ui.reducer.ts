import { createFeature, createReducer, on } from "@ngrx/store";

import { hideLoading, showLoading, showModal } from "./ui.actions";
import { UiState } from "./types";

export const initialState: UiState = {
  isLoading: false,
  modalMessage: "",
  isError: false,
};

export const uiFeature = createFeature({
  name: "ui",
  reducer: createReducer(
    initialState,
    on(
      showModal,
      (currentState, { payload }): UiState => ({
        ...currentState,
        ...payload,
      })
    ),

    on(
      showLoading,
      (currentState): UiState => ({
        ...currentState,
        isLoading: true,
      })
    ),

    on(
      hideLoading,
      (currentState): UiState => ({
        ...currentState,
        isLoading: false,
      })
    )
  ),
});

export const {
  name: uiFeatureKey,
  reducer,
  selectUiState,
  selectModalMessage,
  selectIsError,
  selectIsLoading,
} = uiFeature;

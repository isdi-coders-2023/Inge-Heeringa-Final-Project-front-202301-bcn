import { createAction, props } from "@ngrx/store";
import { UiState } from "../types";

export const showModal = createAction(
  "[Ui] Show modal",
  props<{ payload: UiState }>()
);

import { createAction, props } from "@ngrx/store";
import { UiState } from "../types";

export const showModal = createAction(
  "[Ui] Show Modal",
  props<{ payload: UiState }>()
);

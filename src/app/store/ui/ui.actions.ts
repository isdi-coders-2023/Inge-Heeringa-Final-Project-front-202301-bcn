import { createAction, props } from "@ngrx/store";
import { type Modal } from "./types";

export const showModal = createAction(
  "[Ui] Show Modal",
  props<{ payload: Modal }>()
);

export const showLoading = createAction("[Ui] Show Loading");

export const hideLoading = createAction("[Ui] Hide Loading");

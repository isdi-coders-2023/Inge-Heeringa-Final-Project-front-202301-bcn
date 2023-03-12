import { createAction, props } from "@ngrx/store";
import { type User } from "./types";

export const loginUser = createAction(
  "[User] Login User",
  props<{ payload: User }>()
);

export const logoutUser = createAction("[User] Logout User");

import { createAction, props } from "@ngrx/store";
import { User } from "../../types";

export const loginUsers = createAction(
  "[User] Login Users",
  props<{ payload: User }>()
);

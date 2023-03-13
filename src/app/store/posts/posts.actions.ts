import { createAction, props } from "@ngrx/store";
import { type Posts } from "./types";

export const loadPosts = createAction(
  "[Posts] Load Posts",
  props<{ payload: Posts }>()
);

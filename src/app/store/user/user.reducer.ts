import { createFeature, createReducer, on } from "@ngrx/store";
import { type UserState } from "./types";
import { loginUser, logoutUser } from "./user.actions";

export const initialState: UserState = {
  email: "",
  token: "",
  isLogged: false,
};

export const userFeature = createFeature({
  name: "user",
  reducer: createReducer(
    initialState,
    on(
      loginUser,
      (currentState, { payload }): UserState => ({
        ...currentState,
        ...payload,
        isLogged: true,
      })
    ),

    on(
      logoutUser,
      (currentState): UserState => ({
        ...currentState,
        email: "",
        token: "",
        isLogged: false,
      })
    )
  ),
});

export const {
  name: userFeatureKey,
  reducer,
  selectUserState,
  selectEmail,
  selectToken,
  selectIsLogged,
} = userFeature;

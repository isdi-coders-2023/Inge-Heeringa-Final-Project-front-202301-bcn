import { createFeature, createReducer, on } from "@ngrx/store";
import { UserState } from "../../types";
import { loginUser } from "../actions/user.actions";

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

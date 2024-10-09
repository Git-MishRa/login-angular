import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, logout } from './auth.actions';

export interface AuthState {
  user: any;
  loggedIn: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  loggedIn: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, state => ({ ...state, error: null })),
  on(loginSuccess, (state, { user }) => ({ ...state, user, loggedIn: true })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
  on(logout, state => ({ ...state, user: null, loggedIn: false }))
);
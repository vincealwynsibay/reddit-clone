import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
	user?: string | null;
	error?: any;
}

const initialState: AuthState = {
	user: JSON.parse(localStorage.getItem("user") || "{}"),
	error: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		initializeAuth: (state, action) => {
			state.user = action.payload;
		},
		login: (state, action) => {
			state.user = action.payload.user;
			localStorage.setItem("jit", action.payload.token);
		},
		logout: (state) => {
			state.user = null;
			localStorage.removeItem("user");
		},
	},
});

export const { initializeAuth, login, logout } = authSlice.actions;
export default authSlice.reducer;

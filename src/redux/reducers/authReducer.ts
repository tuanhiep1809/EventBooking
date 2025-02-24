import {createSlice} from '@reduxjs/toolkit';
interface AuthState {
  id: string;
  email: string;
  accessToken: string;
}
const initialState: AuthState = {
  id: '',
  email: '',
  accessToken: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuthData: (state, action) => {
      state.authData = action.payload;
    },
    removeAuthData: (state, action) => {
      state.authData = initialState;
    },
  },
});
export const authReducer = authSlice.reducer;
export const {addAuthData, removeAuthData} = authSlice.actions;
export const authSelector = (state: any) => state.authReducer.authData;

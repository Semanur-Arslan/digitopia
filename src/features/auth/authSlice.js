import { createSlice } from '@reduxjs/toolkit';
import { login } from '@/app/api/login/route';
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    idToken: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setTokens: (state, action) => {
      const { idToken, refreshToken, accessToken } = action.payload;

      state.idToken = idToken.jwtToken;
      state.refreshToken = refreshToken.token;
      state.accessToken = accessToken.jwtToken;

      if (idToken.jwtToken) {
        const decodedIdToken = jwtDecode(idToken.jwtToken);
        state.user = {
          organizationId: decodedIdToken['custom:organizationId'],
          role: decodedIdToken['custom:role'],
          organizationRole: decodedIdToken['custom:organizationRole'],
          name: decodedIdToken['name'],
          familyName: decodedIdToken['family_name']
        };
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.idToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { idToken, refreshToken, accessToken } = action.payload;
        state.idToken = idToken.jwtToken;
        state.refreshToken = refreshToken.token;
        state.accessToken = accessToken.jwtToken;

        if (idToken.jwtToken) {
          try {
            const decodedIdToken = jwtDecode(idToken.jwtToken);
            state.user = {
              organizationId: decodedIdToken['custom:organizationId'],
              role: decodedIdToken['custom:role'],
              organizationRole: decodedIdToken['custom:organizationRole'],
              name: decodedIdToken['name'],
              familyName: decodedIdToken['family_name']
            };
          } catch (error) {
            console.error('Error decoding token:', error);
            state.error = 'Failed to decode token';
          }
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.auth.user;
export const activeToken = (state) => state.auth.accessToken;
export const { setTokens, clearUser } = authSlice.actions;
export default authSlice.reducer;

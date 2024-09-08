import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/features/auth/authSlice';
import toastReducer from '@/features/toast/toastSlice';
import languageReducer from '@/features/language/languageSlice';
import rightPanelReducer from '@/features/rightPanel/rightPanelSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  language: languageReducer,
  rightPanel: rightPanelReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

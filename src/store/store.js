import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/features/auth/authSlice';
import toastReducer from '@/features/toast/toastSlice';
import languageReducer from '@/features/language/languageSlice';
import rightPanelReducer from '@/features/rightPanel/rightPanelSlice';
import industriesReducer from '@/features/rightPanel/industriesSlice';
import countriesReducer from '@/features/rightPanel/countriesSlice';
import organizationReducer from '@/features/rightPanel/organizationSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  language: languageReducer,
  rightPanel: rightPanelReducer,
  industries: industriesReducer,
  countries: countriesReducer,
  organization: organizationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
